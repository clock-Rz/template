export default function ({ store }) {
  if (store.$id.indexOf('store') == 0) {
    const ipc = window.electron.ipcRenderer
    const storeName = store.$id
    store.$onAction(({ after }) => {
      after(() => {
        $updata()
      })
    })

    ipc.on('pinia-store-set', (event, targetStoreName, jsonStr) => {
      if (storeName === targetStoreName) {
        console.log('被动更新状态:' + storeName)
        const obj = JSON.parse(jsonStr)
        const keys = Object.keys(obj)
        const values = Object.values(obj)

        for (let i = 0; i < keys.length; i++) {
          store.$state[keys[i]] = values[i]
        }
      }
    })

    return {
      $set: function (path, value) {
        let arr = path
          .replace(/\[|\]\.|\]\s+|\]|\s+/g, '.')
          .replace(/\.+$/, '')
          .split('.')
        arr.reduce((accumulator, currentValue, currentIndex) => {
          if (currentIndex == arr.length - 1) {
            accumulator[currentValue] = value
          }
          return accumulator[currentValue]
        }, this.$state)

        this.$updata()
      },
      $updata: function (str = JSON.stringify(store.$state)) {
        localStorage.setItem(storeName, str)
        ipc.invoke('pinia-store-change', storeName, str)
      },
      storeName
    }
  }
}
