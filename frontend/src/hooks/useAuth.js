// Acesso a API
import api from '../utils/api'

import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function useAuth() {
    async function regiter(user) {
        try {
            const data = await api.post('/users/register', user).then((response) => {
                return response.data
            })
            console.log(data)
        } catch (error) {
            // Tratamento de erro
            console.log(error)
        }
    }
    return { regiter }
}