import api from '../../../utils/api'
import { useState, useEffect } from 'react'

import styles from './Profile.module.css'
import formStyles from '../../form/Form.module.css'

import Input from '../../form/Input'


import useFlashMessage from '../../../hooks/useFlashMessage'
function Profile() {
    const [user, setUser] = useState({})
    const [preview, setPreview] = useState('')
    const [token] = useState(localStorage.getItem('token') || '')
    const { setFlashMessage } = useFlashMessage()

    useEffect(() => {
        api.get('/users/checkuser', {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`
            }
        }).then((response) => {
            setUser(response.data)
        })
    }, [token])
    /**
     * `onFileChange` is a function that takes an event as an argument and sets the user state to the event
     * target's name and the event target's file.
     * @param e - the event object
     */
    function onFileChange(e) {
        setPreview(e.target.files[0])
        setUser({ ...user, [e.target.name]: e.target.files[0] })
    }
    /**
     * When the user changes the value of an input, update the user object with the new value.
     * @param e - the event object
     */
    function handleChange(e) {
        setUser({ ...user, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault()

        let msgType = 'success'

        const formData = new FormData()

        await Object.keys(user).forEach((key) =>
            formData.append(key, user[key])
        )
        const data = await api.patch(`/users/edit/${user._id}`, formData, {
            headers: {
                Authorization: `Bearer ${JSON.parse(token)}`,
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                return response.data
            })
            .catch((err) => {
                msgType = 'error'
                return err.response.data
            })
        setFlashMessage(data.message, msgType)
    }
    return (
        <section>
            <div className={styles.profile_headers}>
                <h1>Perfil</h1>
                {(user.image || preview) && (
                    <img
                        src={
                            preview
                                ? URL.createObjectURL(preview)
                                : `${process.env.REACT_APP_API}/images/users/${user.image}`
                        }
                        alt={user.name}
                    />
                )}
            </div>

            <form onSubmit={handleSubmit} className={formStyles.form_control}>
                <Input
                    text="Imagem"
                    type="file"
                    name="image"
                    handleOnChange={onFileChange}
                />
                <Input
                    text="E-mail"
                    type="email"
                    name="email"
                    placeholder="Digite o seu e-mail"
                    handleOnChange={handleChange}
                    value={user.email || ''}
                />
                <Input
                    text="Nome"
                    type="text"
                    name="name"
                    placeholder="Digite o seu nome"
                    handleOnChange={handleChange}
                    value={user.name || ''}
                />
                <Input
                    text="Telefone"
                    type="text"
                    name="phone"
                    placeholder="Digite o seu telefone"
                    handleOnChange={handleChange}
                    value={user.phone || ''}
                />
                <Input
                    text="Senha"
                    type="password"
                    name="password"
                    placeholder="Digite a sua senha"
                    handleOnChange={handleChange}

                />
                <Input
                    text="Confirmação de senha"
                    type="password"
                    name="confirmpassword"
                    placeholder="Confirme a sua senha"
                    handleOnChange={handleChange}

                />
                <input type="submit" value="Editar" />
            </form>
        </section>
    )
}

export default Profile