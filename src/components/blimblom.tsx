import { useRouter } from "next/router"
import { useEffect } from "react"
import { api } from "~/utils/api"
import Button from "./button"

export default function ItemNoteOfListShowNotes (props: any){

    const router = useRouter()

    const {mutate: deleteNoteMutation, isSuccess: deleteSuccess} = api.personalNote.deleteNote.useMutation()

    useEffect(() => {
        if (deleteSuccess) {
            alert('Nota deletada!');
            window.location.href = window.location.href;;
        }
    }, [deleteSuccess]);

    function handleEditNote(id: number){
        router.push({
            pathname: `/editNote/${id}`
        })
    }

    function handleDelete(){
        deleteNoteMutation({
            id: props.id
        })
    }
    return (
        <>   
            <li className="w-full bg-[#FBF9F1] cursor-pointer" >
                <div id="DB_Note" className="w-full flex justify-between h-14">
                    <div className="flex flex-col justify-around w-full overflow-hidden px-2 py-1" onClick={() => handleEditNote(props.id)}>
                        <p id="title_Note" className=" whitespace-nowrap overflow-hidden text-lg ">{props.title}</p>
                        <p id="content_Note" className=" text-xs overflow-hidden ">{props.content}</p>
                    </div>
                    <Button onClick={() => handleDelete()} value="..."/>
                </div>
            </li><hr></hr>
        </>
    )
}