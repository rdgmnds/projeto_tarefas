import { useState } from 'react';
import { Link, replace } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConnection';
import { signInWithEmailAndPassword } from 'firebase/auth';

import './home.css';

function Home(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigate = useNavigate();

    async function handleLogin(e){
        e.preventDefault();

        if (email !== "" && senha !== ""){
            await signInWithEmailAndPassword(auth, email, senha)
            .then(()=>{
                navigate("/admin", { replace: true } )
            })
            .catch((error) =>{
                toast.error("Erro ao tentar fazer login: " + error);
            })

            setEmail("")
            setSenha("")
        }else{
            toast.error("Atenção! Preencha todos os campos.")
        }

    }

    return(
        <div className='lista-tarefas'>
            <h1>Lista de Tarefas</h1>
            <span>Seja até 87% mais produtivo gerenciando sua agenda de forma rápida e fácil</span>

            <form className='form' onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Digite o seu e-mail..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Digite a sua senha..."
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                />

                <button type='submit'>Entrar</button>
            </form>

            <Link to={"/register"}>Não possui uma conta? Cadastre-se aqui!</Link>

        </div>
    )
}

export default Home;