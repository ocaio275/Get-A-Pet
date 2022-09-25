import api from '../../../utils/api'
import styles from './AddPet.module.css'

import { useState } from 'react'
import { Navigate } from 'react-router-dom'

import useFlashMessage from '../../../hooks/useFlashMessage'
function AddPet() {
    return (
        <section className={styles.addpet_header}>
            <div>
                <h1>Adiconar Pet</h1>
                <p>Depois ele ficará disponível para adoção</p>       
                <p>Formulário</p>         
            </div>
        </section>
    )
}

export default AddPet