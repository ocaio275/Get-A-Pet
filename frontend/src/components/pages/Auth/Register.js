import { useContext, useState } from "react"
/* Component */
import Input from "../../form/Input"
import styles from "../../form/Form.module.css"
import { Link } from "react-router-dom"

/**Context */
import { Context } from "../../../context/UserContext"
function Register() {
    const [user, setUser] = useState({})
    const { register } = useContext(Context)

    function handleChage(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    function handleSubmit(e) {
        e.preventDefault()

        register(user)

    }
    return (
        <section className={styles.form_control}>
            <h1>Registrar</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChage}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleChage}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChage}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite uma senha"
                    handleOnChange={handleChage}
                />
                <Input
                    text="Confirmação de senha"
                    type="password"
                    name="confirmPassword"
                    placeholder="Repita a senha"
                    handleOnChange={handleChage}
                />
                <input type="submit" value="Cadastrar" />
            </form>
            <p>
                Já tem conta? <Link to="/login" >Clique aqui.</Link >
            </p>
        </section>
    )
}

export default Register