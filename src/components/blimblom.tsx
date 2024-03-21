export default function ItemNoteOfListShowNotes (props: any){
    return (
        <>
            <li className="bg-red-500">
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