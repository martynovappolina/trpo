const baseUrl = window.location.hostname == 'localhost' ? 'http://localhost:5000/' : ''

const api = () => {
    const request = (method, url, data, isBlob = false) => {
        const headers = localStorage.getItem('token') ? {
            Authorization: `Bearer ${localStorage.getItem('token')}`
        } : null
        
        let newLocal
        if(headers != null){
            if(method == 'post'){
                if (data?.toString() !== '[object FormData]') 
                    headers['Content-Type'] = 'application/json'
                
                headers.accept = 'application/json'
            }
            newLocal = {
                method: method,
                body: data ? data : null,
                headers: headers
            }
        }
        else
            newLocal = {
                method: method,
                body: data ? data : null,
            }  
                  
        return fetch(`${baseUrl}${url}`, newLocal)
        .then(resp => {
            if (resp.status !== 200) {
                if(resp.status === 401) window.location = '/login'
                return { isSuccess: false }
            }
            if(isBlob)
                return resp.blob()
            return resp.json()
        })
    }

    const requestPost = (url, data) => {
        return request('post', url, data)
    }
    const requestGet = (url, isBlob = false) => {
        return request('get', url, null, isBlob)
    }

    const requestPut = (url, data) => {
        return request('put', url, data)
    }

    const requestDelete = (url, data) => {
        return request('delete', url, data)
    }

    return {
        login: (login, password) => {
            return requestPost(`api/users/login?login=${login}&password=${password}`)
        },

        getEventsByOrganizationID: () => {
            return requestGet(`api/events/getByOrganizationID?id=${localStorage.getItem('organizationID')}`)
        },
        sendPhoto: (data) => {
            return requestPost(`api/events/create?cameraID=550e8400-e29b-41d4-a716-446655440006`, data, true)
        },
    }
}

export default api();
export const apiBaseUrl = baseUrl