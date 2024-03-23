export default function Button(props: any){
    return (
        <>
            <button type="button" onClick={props.onClick} className={props.className}>{props.value}</button>
        </>
    )
}