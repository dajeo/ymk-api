import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const baseUrl = ''
const studentUrl = `${baseUrl}/student`
const teacherUrl = `${baseUrl}/teacher`

async function sendRequest(url, type, params) {
    const res = await fetch(`${url}/${type}.php`, {
      method: 'post',
      body: params
    })

    return await res.text()
}

const app = express()

app.use(cors())

app.post('/teachers', async (req, res) => {
    const params = new URLSearchParams()
    params.append('student', 'oenp')

    res.send(await sendRequest(teacherUrl, 'list_alphabet', params))
})

app.post('/teachers/:teacher/:week', async (req, res) => {
    const teacher = req.params.teacher
    const week = req.params.week

    const params = new URLSearchParams()
    params.append('name_teacher', teacher)
    params.append('week', week)

    res.send(await sendRequest(teacherUrl, 'teacher_schedule', params))
})

app.post('/students/:department', async (req, res) => {
    const department = req.params.department

    const params = new URLSearchParams()
    params.append('branch', department)

    res.send(await sendRequest(studentUrl, 'list_group', params))
})

app.post('/students/:department/:group/:week', async (req, res) => {
    const department = req.params.department
    const group = req.params.group
    const week = req.params.week

    const params = new URLSearchParams()
    params.append('num_group', group)
    params.append('branch', department)
    params.append('week', week)

    res.send(await sendRequest(studentUrl, 'schedule_group', params))
})

app.listen(8080, () => {
    console.log('Server is started.')
})
