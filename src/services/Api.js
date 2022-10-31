/* import * as dotenv from "dotenv";
dotenv.config(); */

/**
 * Toma una URL como parámetro y devuelve un objeto JSON.
 * @param parametros - "/api/v1/selects/categorias"
 * @returns {
 *   "data": [
 *     {
 *       "id": 1,
 *       "nombre": "Categoria 1"
 *     },
 *     {
 *       "id": 2,
 *       "nombre": "Categoria 2"
 *     },
 *     {
 *       "id": 3,
 *       "nombre": "Categoria 3"
 * 		}
 * 		]
 */
export async function PeticionApi(parametros) {
	//console.log(parametros);
	const respuesta = await fetch(`http://192.168.1.74:5000${parametros}`);
	return respuesta.json();
}
