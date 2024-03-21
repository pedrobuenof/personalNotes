export default function Button(props: any){
    return (
        <>
            <button type="button" onClick={props.onClick} className="bg-gray-500 border-2 w-48 mt-2">Write a new note</button>
        </>
    )
}