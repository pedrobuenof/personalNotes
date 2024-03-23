import Link from "next/link"
import { useRouter } from "next/router"

export default function ItemNoteOfListShowNotes (props: any){

    const router = useRouter()

    function handleEditNote(id: number){
        router.push({
            pathname: `/editNote/${id}`
        })
    }
    return (
        <>   
            <li className="bg-red-500" onClick={() => handleEditNote(props.id)}>
                <div id="DB_Note" className="flex justify-between h-14 leading-6 overflow-hidden mx-2">
                    <div className="flex flex-col mt-1">
                        <p id="title_Note">{props.title}</p>
                        <p id="content_Note" className=" text-xs leading-5 mt-1">{props.content}</p>
                    </div>
                    <span>...</span>
                </div>
            </li><hr></hr>
        </>
    )
}