import React, { useEffect, useRef, useState } from 'react'
import useScoket from '../../zustand/socket.config'
import { api } from '../../api/Api'
import { useMutation, useQuery } from '@tanstack/react-query'
import { FileUpIcon, Pencil } from 'lucide-react'
type UpdateProfile = {
    image: File
}

const getprofile = async (userId: string) => {
    const res = await api.get(`users/getprofile/${userId}`)
    return res.data
}
const updateProfile = async (authUser: string, image: File) => {
    const formData = new FormData();

    formData.append("image", image);

    const res = await api.patch(
        `users/update/${authUser}`,
        formData
    );

    return res.data;
};
const Profiles = () => {
    const { authUser, checkauth } = useScoket()
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string>("");
    const { data: profile } = useQuery({
        queryKey: [authUser?.id],
        queryFn: () => getprofile(authUser!.id),
        enabled: !!authUser?.id
    })
    const mutation = useMutation({
        mutationFn: () => {
            if (!authUser?.id || !image) {
                throw new Error("Image not selected");
            }

            return updateProfile(authUser.id, image);
        },

        onSuccess: () => {
            checkauth();
        },
    });
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setImage(file);

        // Preview
        setPreview(URL.createObjectURL(file));
    };
    console.log("the profile is ", profile)
    const fileinputRef = useRef<HTMLInputElement>(null)

    const handleClick = () => {
        fileinputRef.current?.click();
    }

    return (
        <div className='w-full h-full p-2'>
            <div className='bg-gradient-to-r from-violet-600 to-indigo-600  rounded-lg border-2 border-[#3B3B4F] p-4' >
                <div className='flex flex-col items-center justify-center'>
                    <div className="w-20 h-20 border-2 border-blue-300 rounded-xl overflow-hidden">
                        <img
                            src={
                                preview ||
                                profile?.image ||
                                "https://via.placeholder.com/150"
                            }
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <input type="file" ref={fileinputRef} hidden accept='image/*' onChange={handleFileChange} />
                        <button
                            onClick={handleClick}
                            className="p-1  text-gray-400 flex gap-2"
                        >
                            <Pencil size={20} /> change
                        </button>
                        {image && (
                            <button
                                type="button"
                                onClick={() => mutation.mutate()}
                                disabled={mutation.isPending}
                                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded-lg"
                            >
                                {mutation.isPending ? "Uploading..." : "Update Photo"}
                            </button>
                        )}
                    </div>
                    <div>
                        <span className='font-bold text-white text-[20px]'>{profile?.FullName}</span>
                    </div>
                    <div>
                        <span className='text-white text-sm'>{profile?.Phone}</span>
                    </div>
                    <div className='flex gap-2.5 text-white text-[10px]'>
                        <p>⭐4.92</p>
                        <p>142 Rides</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profiles
