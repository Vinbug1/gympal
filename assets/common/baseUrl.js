
//baseUrl = 'https://gasafebackend.onrender.com/api/v1/'


{
    Platform.OS == 'android'
? baseUrl = 'http://10.0.2.2:3000/api/v1/'
: baseUrl = 'http://localhost:3000/api/v1/'
}
export default baseUrl