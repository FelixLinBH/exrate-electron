const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig () {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'release-builds')

  return Promise.resolve({
    appDirectory: path.join(rootPath, 'Exrate-win32-x64/'),
    authors: 'Felix Lin',
    outputDirectory: path.join(outPath, 'windows-installer'),
    exe: 'Exrate.exe',
    noMsi: true,
    setupExe: 'ExrateAppInstaller.exe',
    setupIcon: path.join(rootPath, 'favicon.ico')
  })
}