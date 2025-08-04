import { useState, useEffect } from 'react';
import { db, auth } from '../../firebaseConnection';
import { signOut } from 'firebase/auth';
import { toast } from 'react-toastify';
import { 
    addDoc, 
    collection, 
    onSnapshot,
    query,
    orderBy,
    where,
    doc,
    deleteDoc,
    updateDoc, } from 'firebase/firestore';

import './admin.css';

function Admin(){
    const [tarefaInput, setTarefaInput] = useState("");
    const [user, setUser] = useState({});
    const [tarefas, setTarefas] = useState([]);
    const [edit, setEdit] = useState({});

    useEffect(() => {
        async function loadTarefas(){
            const userDetail = localStorage.getItem("@detailUser")
            setUser(JSON.parse(userDetail))

            // SE O USUÁRIO ESTIVER NO LOCAL STORAGE, AS TAREFAS SÃO BUSCADAS NO DB
            if (userDetail){
                const data = JSON.parse(userDetail);

                const tarefaRef = collection(db, "tarefas");
                const q = query(tarefaRef, orderBy("created", "desc"), where("userUid", "==", data.uid));

                const unsub = onSnapshot(q, (snapchot) => {
                    let lista = [];

                    snapchot.forEach((doc) => {
                        lista.push({
                            id: doc.id,
                            tarefa: doc.data().tarefa,
                            userUid: doc.data().userUid,
                        })
                    })

                    setTarefas(lista);

                })

            }
        }

        loadTarefas();

    }, [])


    async function handleRegister(e){
        e.preventDefault();

        if(tarefaInput === ""){
            toast.error("Digite sua tarefa...");
            return;
        }

        // SE O USUÁRIO CLICOU NO BOTÃO DE EDITAR, REGISTRE NOVAMENTE
        if (edit.id){
            handleUpdateTarefa();
            return;
        }

        await addDoc(collection(db, "tarefas"), {
            tarefa: tarefaInput,
            created: new Date(),
            userUid: user.uid,
        })
        .then(() => {
            setTarefaInput("");
        })
        .catch((error) => {
            toast.error("Erro ao tentar registrar tarefa: " + error);
        })

    }


    async function handleLogout(){
        await signOut(auth);
    }


    async function tarefaDelete(id){
        const tarefaDoc = doc(db, "tarefas", id);
        await deleteDoc(tarefaDoc);
        toast.success("Parabéns! Você concluiu a tarefa!");
    }


    function editTarefa(item){
        setTarefaInput(item.tarefa);
        setEdit(item);
    }


    async function handleUpdateTarefa(){
        const docRef = doc(db, "tarefas", edit.id)
        await updateDoc(docRef, {
            tarefa: tarefaInput
        })
        .then(() => {
            toast.success("Tarefa atualizada com sucesso!")
            setTarefaInput("")
            setEdit({})
        })
        .catch((error) => {
            toast.error("Não foi possível atualizar a tarefa: " + error)
            setTarefaInput("")
            setEdit({})
        })
    }

    return(
        <div className="admin-container">
            <h1>Minhas tarefas</h1>

        <form className='form' onSubmit={handleRegister}>
            <textarea 
                placeholder="Digite aqui a sua tarefa..."
                value={tarefaInput}
                onChange={(e) => setTarefaInput(e.target.value)}
            />
           
            {Object.keys(edit).length > 0 ? (
                <button className='btn-adicionar' type='submit'>Atualizar tarefa</button>
            ) : (
                <button className='btn-adicionar' type='submit'>Registrar tarefa</button>
            )}
        </form>

        {tarefas.map((item) => (
            <article key={item.id} className='list'>
                <p>{item.tarefa}</p>
                <button onClick={ () => editTarefa(item) } className='btn-editar'>Editar</button>
                <button onClick={ () => tarefaDelete(item.id) } className='btn-concluir'>Concluir</button>
            </article>
        ))}

            <button onClick={handleLogout} className='btn-logout'>Sair</button>
        </div>
    )
}

export default Admin;