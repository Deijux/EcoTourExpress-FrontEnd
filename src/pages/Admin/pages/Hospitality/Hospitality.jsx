import PageSchema from '../PageSchema/PageSchema'
import ModalAdmin from '../../components/ModalAdmin/ModalAdmin'
import { useHospitality } from '../../../../context/HospitalityContext'
import { useState } from 'react'

function Hospitality() {
	const {
		hospitality,
		handleSetHospitality,
		handleUpdateHospitality,
		handleDeleteHospitality,
	} = useHospitality()
	const title = 'Gestión de Hospedaje'
	const columnsDisplay = ['ID', 'Tipo', 'Capacidad', 'Disponibilidad', 'Precio']
	const columns = [
		'id_hospedaje',
		'tipo_hab',
		'capacidad',
		'disponibilidad',
		'precio_hab',
	]
	const actions = ['Nuevo', 'Editar', 'Eliminar']
	const contentModalState = {
		title: '',
		button: '',
		inputs: [],
	}
	const hospitalitySelectedState = {
		id_hospedaje: '',
		tipo_hab: '',
		capacidad: '',
		disponibilidad: '',
		precio_hab: '',
	}
	const [modal, setModal] = useState(false)
	const [contentModal, setContentModal] = useState(contentModalState)
	const [hospitalitySelected, setHospitalitySelect] = useState(
		hospitalitySelectedState,
	)

	const handleModal = action => {
		switch (action) {
			case 'Nuevo':
				setModal(!modal)
				setHospitalitySelect(hospitalitySelectedState)
				setContentModal({
					title: 'Agregar Hospedaje',
					button: 'Agregar',
					inputs: [
						{
							type: 'text',
							name: 'tipo_hab',
							placeholder: 'Tipo',
						},
						{
							type: 'text',
							name: 'capacidad',
							placeholder: 'Capacidad',
						},
						{
							type: 'text',
							name: 'disponibilidad',
							placeholder: 'Disponibilidad',
						},
						{
							type: 'number',
							name: 'precio_hab',
							placeholder: 'Precio',
						},
					],
				})
				break
			case 'Editar':
				setModal(!modal)
				setContentModal({
					title: 'Editar Hospedaje',
					button: 'Editar',
					inputs: [
						{
							type: 'text',
							name: 'tipo_hab',
							placeholder: 'Tipo',
						},
						{
							type: 'text',
							name: 'capacidad',
							placeholder: 'Capacidad',
						},
						{
							type: 'text',
							name: 'disponibilidad',
							placeholder: 'Disponibilidad',
						},
						{
							type: 'number',
							name: 'precio_hab',
							placeholder: 'Precio',
						},
					],
				})
				break
			case 'Eliminar':
				setModal(!modal)
				setContentModal({
					title: 'Eliminar Hospedaje',
					button: 'Eliminar',
					inputs: [
						{
							type: 'text',
							name: 'id_hospedaje',
							placeholder: 'ID',
						},
					],
				})
				break
			default:
				break
		}
	}

	const handleHospitality = async hospedajeData => {
		if (contentModal.title === 'Agregar Hospedaje') {
			handleSetHospitality(hospedajeData)
		} else if (contentModal.title === 'Editar Hospedaje') {
			handleUpdateHospitality(hospedajeData)
		} else if (contentModal.title === 'Eliminar Hospedaje') {
			handleDeleteHospitality(hospedajeData.id_hospedaje)
		}
	}

	const handleRowClick = row => {
		setHospitalitySelect({
			id_hospedaje: row.id_hospedaje || '',
			tipo_hab: row.tipo_hab || '',
			capacidad: row.capacidad || '',
			disponibilidad: row.disponibilidad || '',
			precio_hab: row.precio_hab || '',
		})
	}

	return (
		<>
			<PageSchema
				title={title}
				columns={columns}
				columnsDisplay={columnsDisplay}
				data={Array.isArray(hospitality) ? hospitality : []}
				actions={actions}
				activeModal={handleModal}
				handleRowClick={handleRowClick}
				dataInitialState={hospitalitySelectedState}
			/>
			<ModalAdmin
				active={modal}
				setActive={setModal}
				content={contentModal}
				setData={handleHospitality}
				rowSelected={hospitalitySelected}
			/>
		</>
	)
}

export default Hospitality
