import { useState, useEffect } from 'react';
import { auth } from '../firebaseConnection';
import { onAuthStateChanged } from 'firebase/auth';
import { Navigate } from 'react-router-dom';

function Private({ children }){
    const [loading, setLoading] = useState(true);
    const [signed, setSigned] = useState(false);

    useEffect(() => {
        async function checkLogin(){
            const unsub = onAuthStateChanged(auth, (user) => {
                if (user){
                    const userData = {
                        uid: user.uid,
                        email: user.email,
                    }

                    localStorage.setItem("@detailUser", JSON.stringify(userData))

                    setLoading(false);
                    setSigned(true);

                } else{
                    setLoading(false);
                    setSigned(false);
                }
            })

        }

        checkLogin();
    }, [])

    // SE ESTIVER CARREGANDO, NÃO MOSTRE NADA
    if(loading){
        return(
            <div></div>
        )
    }

    // SE O USUARIO NÃO FOR LOGADO, VOLTE PARA HOME
    if(!signed){
        return <Navigate to="/"/>
    }

    return children; // RETORNO APÓS TODAS AS VERIFICAÇÕES

}

export default Private;