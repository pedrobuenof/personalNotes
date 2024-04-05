import { Note } from "@prisma/client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "~/components/button";
import { api } from "~/utils/api";

interface NoteFormProps {
  isNewNote: boolean;
  initialNote?: Note;
}

export default function NoteForm(props: NoteFormProps) {
    const router = useRouter();
    const { isNewNote, initialNote} = props;

    const [inputTitle, setTitle] = useState<string>('');
    const [inputContent, setContent] = useState<string>('');
    const [error, setError] = useState<string>('');

    const { data: saveNote, mutate: createNoteMutation, isSuccess: createSuccess, error: createError } = api.personalNote.createNote.useMutation();
    const {mutate: updateNoteMutation, isSuccess: updateSuccess, error: updateError } = api.personalNote.updateNote.useMutation()
    const {mutate: deleteNoteMutation, isSuccess: deleteSuccess, error: deleteError } = api.personalNote.deleteNote.useMutation()

    
    

    const noteDbMutation = isNewNote ? createNoteMutation : updateNoteMutation;

    const isSuccess = isNewNote ? createSuccess : updateSuccess;

    //LIDA COM ERROS
    useEffect(() => {
        const extractErrorMessages = (errorData: any) => {
          const fieldErrors = errorData?.zodError?.fieldErrors;
          const messages = [];
      
          if (fieldErrors?.title?.[0]) {
            messages.push(fieldErrors.title[0]);
          }
          
          if (fieldErrors?.content?.[0]) {
            messages.push(fieldErrors.content[0]);
          }
      
          return messages;
        };
      
        let consolidatedErrorMessages: string[] = [];
      
        if (createError) {
          consolidatedErrorMessages = extractErrorMessages(createError.data);
        } else if (updateError) {
            const erroUpdateReal = updateError.message
            setError(erroUpdateReal)    
        }
      
        if (consolidatedErrorMessages.length > 0) {
            const messageHandled = consolidatedErrorMessages.join(' - ')
            setError(messageHandled);
        }
      }, [createError, updateError, deleteError]);

    
    // LIDA COM MENSAGEM DE RESPOSTA PARA NOTAS SALVAS + REDIREC PARA PÁGINA DE EDIÇÃO
    useEffect(() => {
        if (isSuccess && saveNote) {
        console.log(saveNote);
        alert('Nota salva com sucesso!');
        router.push(`/editNote/${saveNote.id}`);
        }
    }, [isSuccess]);

    // LIDA COM OS VALORES DOS INPUTS NO CASO SER A PÁGINA DE EDIÇÃO
    useEffect(() => {
        if (initialNote) {
        setTitle(initialNote.title);
        setContent(initialNote.content);
        }
    }, [initialNote]);

    // LIDA COM MENSAGEM DE RESPOSTA PARA NOTAS DELETADAS + REDIREC PARA PÁGINA INICIAL
    useEffect(() => {
        if (deleteSuccess) {
        alert('Nota deletada!');
        router.push('/');
        }
    }, [deleteSuccess]);

    // LIDA COM MENSAGEM DE RESPOSTA PARA NOTAS EDITADAS + ATUALIZA O ESTADO DA MENSAGEM DE ERROR PARA 'VAZIA'
    useEffect(() => {    
        if (updateSuccess) {
            setError('')
            alert("Nota editada com sucesso")
        }
    }, [updateSuccess])


    const backToListAllNotes = () => {
        router.push('/');
    };

    const handleWithMutationNote = () => {
        if (noteDbMutation === createNoteMutation) {
            noteDbMutation({
                title: inputTitle,
                content: inputContent
            })
        } else if (noteDbMutation === updateNoteMutation){
            if (initialNote) {          
                noteDbMutation({
                    id: initialNote.id,
                    title: inputTitle,
                    content: inputContent
                });
            }
        }
    }
    const handleWithDelete = () => {
        if (initialNote) {
            deleteNoteMutation({
                id: initialNote.id
            })
        }
    }
    return (
        <>
            <div id="space_Write_Note" className="flex flex-col justify-start items-center w-screen h-screen bg-[#E5E1DA] p-3">
                <div className="flex flex-col justify-center items-center
                                sm:w-[400px]
                                lg:w-[700px] lg:p-3">
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <div id="save_Or_Delete" className="flex justify-between w-full px-2">
                        <Button onClick={backToListAllNotes} value="All notes" />
                        {isNewNote ? (
                        <Button 
                            onClick={handleWithMutationNote}
                            value="Save"
                        />
                        ) : (
                            <>
                                <div>
                                    <Button onClick={handleWithDelete} value="..." className="mr-3"/>
                                    
                                    <Button onClick={handleWithMutationNote} value="Save edition" />
                                </div>
                            </>
                        )}
                    </div>
                    <div className="flex flex-col h-auto rounded-md p-1 bg-white w-full">
                        <input
                            type="text"
                            className="text-xl h-[50px] pl-3 border-b-2"
                            value={inputTitle}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                        <textarea
                            className="resize-none h-auto min-h-[300px] max-h-[630px] py-3 pl-3 pr-2"
                            value={inputContent}
                            onChange={(e) => {
                                setContent(e.target.value);
                                e.target.style.height = 'auto';
                                e.target.style.height = (e.target.scrollHeight) + 'px';
                            } }
                            placeholder="Note"
                        ></textarea>
                    </div>
                </div>
            </div>
        </>
    )
}