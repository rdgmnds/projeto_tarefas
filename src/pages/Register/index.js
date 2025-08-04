import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import "./register.css";

function Register(){
    const [nome, setNome] = useState("");
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const navigate = useNavigate();

    async function handleCadastrar(e){
        if (nome !== "" && email !== "" && senha !== ""){
            e.preventDefault()
            await createUserWithEmailAndPassword(auth, email, senha)
            .then(() => {
                toast.success("Cadastro realizado com sucesso!")
                navigate("/admin")
                setNome("")
                setEmail("")
                setSenha("")
            })
            .catch((error) => {
                toast.error(`Erro ao tentar criar sua conta:  ${error}`)
            })
        }else{
            e.preventDefault()
            toast.error("Atenção! Preencha todos os campos.")
        }
    }

    return(
        <div className="register-container">
            <h1>Criando sua conta</h1>

            <span>Esse é o primeiro passo para você começar a gerenciar seu tempo da melhor forma possível!</span>

            <form className="form" onSubmit={handleCadastrar}>
                <input
                    type="text"
                    placeholder="Digite seu nome..."
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />    
                <input
                    type="text"
                    placeholder="Digite um e-mail..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}                   
                />

                <input
                    type="password"
                    placeholder="Digite uma senha..."
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}                   
                />

                <button type='submit'>Criar conta</button>
            </form>

            <Link to={"/"}>Já possui uma conta? Faça seu login por aqui!</Link>
        </div>
    )
}

export default Register;