export default async function requestAxios(callback, apiName, apiParam = null) {
  console.log('requestAxios 실행');
  try {
    const response = await apiName(apiParam);
    callback(response);
    console.log('requestAxios 성공');
  } catch (e) {
    console.error(e);
    console.log('requestAxios 실패');
  }
}
