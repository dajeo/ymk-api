import fetch from 'node-fetch'

const baseUrl = 'https://xn----8sbaqd1aje6bf1c2g.xn--p1ai'
const studentUrl = `${baseUrl}/student`
const teacherUrl = `${baseUrl}/teacher`

async function sendRequest(url, type, params) {
    const res = await fetch(`${url}/${type}.php`, {
      method: 'POST',
      body: params
    })

    return await res.text()
}

export default async function (instance, opts, done) {
    instance.post('/t', async (req, res) => {
        const params = new URLSearchParams()
        params.append('student', 'oenp')

        res.send(await sendRequest(teacherUrl, 'list_alphabet', params))
    })

    instance.post('/t/:teacher/:week', async (req, res) => {
        const { teacher, week } = req.params

        const params = new URLSearchParams()
        params.append('name_teacher', teacher)
        params.append('week', week)

        res.send(await sendRequest(teacherUrl, 'teacher_schedule', params))
    })

    instance.post('/s/:department', async (req, res) => {
        const { department } = req.params

        const params = new URLSearchParams()
        params.append('branch', department)

        res.send(await sendRequest(studentUrl, 'list_group', params))
    })

    instance.post('/s/:department/:group/:week', async (req, res) => {
        const { department, group, week } = req.params

        const params = new URLSearchParams()
        params.append('num_group', group)
        params.append('branch', department)
        params.append('week', week)

        res.send(await sendRequest(studentUrl, 'schedule_group', params))
    })
    
    done()
}
