# Pet A Get

## Rotas

### Rotas Users
| Metodo | Caminho | Descrição | Autenticação |
| --- | --- | --- | --- |
| `POST` | http://localhost:5000/users/register  | Criação de usuário | ✔ |
| `POST` | http://localhost:5000/users/login  | Login no sistema|  ✔ |
| `GET`| http://localhost:5000/users/checkuser | Verificar usuário |  ✔ |
| `GET`| http://localhost:5000/users/{id} | Retorna dados do usuário |  ✔ |
| `PATCH` | http://localhost:5000/users/edit/{id}  | Atualiza dados do usuário | 🔒 |

### Rotas Pets

| Metodo | Caminho | Descrição | Autenticação |
| --- | --- | --- | --- |
| `POST` | http://localhost:5000/pets/create | Criação do pet | 🔒 |
| `GET` | http://localhost:5000/pets/ | Retorna todos os pets |  ✔ |
| `GET` | http://localhost:5000/pets/mypets | Retorna somente pets do usuário logado | 🔒 |
| `GET` | http://localhost:5000/pets/myadoptions | Lista dos pets que o usuário deseja adotar | 🔒 |
| `GET` | http://localhost:5000/pets/{id} | Retorna informações do pet |  ✔ |
| `DELETE` | http://localhost:5000/pets/{id} | Remove o pet | 🔒 |
| `PATCH` | http://localhost:5000/pets/{id} | Atualiza os dados do pet | 🔒 |
| `PATCH` | http://localhost:5000/pets/schedule/{id} | Função para agendamento de visita| 🔒 |
| `PATCH` | http://localhost:5000/pets/conclude/{id} | Função para finalizar adoção | 🔒 |

