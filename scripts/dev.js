import { exec } from 'child_process'

function ex(cmd, callback) {
    const ls = exec(cmd)
    ls.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`)
        if (callback) {
            if (data) {
                callback(data)
            }
        }
    })
    ls.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`)
    })
    ls.on('close', (code) => {
        console.log(`child process exited with code ${code}`)
    })
}
function RunDev() {
    let signal = true;
    ex('pnpm ui', (msg) => {
        if (!signal) return
        if (msg.includes('built in')) {
            ex('pnpm editor')
            signal = false
        }
    })
}

RunDev()
