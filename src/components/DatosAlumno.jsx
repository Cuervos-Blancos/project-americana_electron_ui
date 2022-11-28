import React from "react";

export const DatosAlumno = ({
	nombreCompleto,
	numeroAlumno,
	grupo,
	carrera,
	fechaPronto,
	fechaAtrasado,
	referenciaPronto,
	referenciaAtrasado,
	cantidadProgramada,
	enviado,
}) => {
	return (
		<div className="">
			<p>
				<strong>
					Nombre: {nombreCompleto}     Numero: {numeroAlumno}
				</strong>
			</p>
			<p>
				<strong>
					Carrera: {carrera}   Grupo: {grupo}
				</strong>
			</p>
			<p>
				Pronto Pago: {fechaPronto}   Cantidad Pronto Pago:{" "}
				{cantidadProgramada}
			</p>
			<p>Referencia: {referenciaPronto}</p>
			<p>
				Pago Atrasado: {parseInt(cantidadProgramada) + 100}     Fecha Pago Atrasado: {fechaAtrasado}
			</p>
			<p>Referencia Pago Atrasado: {referenciaAtrasado}</p>
		</div>
	);
};
