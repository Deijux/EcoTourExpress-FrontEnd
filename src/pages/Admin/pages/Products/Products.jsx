import PageSchema from '../PageSchema/PageSchema'
import ModalAdmin from '../../components/ModalAdmin/ModalAdmin'
import { useProducts } from '../../../../context/ProductsContext'
import { useState } from 'react'
import Error from '../../../../components/Error/Error'
function Products() {
	const {
		products,
		handleSetProducts,
		handleUpdateProduct,
		handleDeleteProduct,
		errorModal,
	} = useProducts()
	const title = 'Gestión de Productos'
	const columns = [
		{
			column: 'id_producto',
			header: 'ID',
		},
		{
			column: 'categoria',
			header: 'Categoria',
		},
		{
			column: 'nombre_p',
			header: 'Nombre',
		},
		{
			column: 'precio_p',
			header: 'Precio',
		},
		{
			column: 'cantidad_disponible',
			header: 'Cantidad',
		},
	]
	const actions = [
		{
			label: 'Nuevo',
			icon: 'pi pi-fw pi-plus',
		},
		{
			label: 'Editar',
			icon: 'pi pi-fw pi-pencil',
		},
		{
			label: 'Eliminar',
			icon: 'pi pi-fw pi-trash',
		},
	]
	const contentModalState = {
		title: '',
		button: '',
		inputs: [],
	}
	const productSelectedState = {
		id_producto: '',
		categoria: '',
		nombre_p: '',
		precio_p: '',
		cantidad_disponible: '',
	}
	const [modal, setModal] = useState(false)
	const [contentModal, setContentModal] = useState(contentModalState)
	const [productSelected, setProductSelected] = useState(productSelectedState)

	const handleModal = action => {
		switch (action) {
			case 'Nuevo':
				setModal(!modal)
				setProductSelected(productSelectedState)
				setContentModal({
					title: 'Agregar Producto',
					button: 'Agregar',
					inputs: [
						{
							type: 'text',
							name: 'categoria',
							placeholder: 'Categoria',
						},
						{
							type: 'text',
							name: 'nombre_p',
							placeholder: 'Nombre Producto',
						},
						{
							type: 'number',
							name: 'precio_p',
							placeholder: 'Precio',
						},
						{
							type: 'number',
							name: 'cantidad_disponible',
							placeholder: 'Cantidad en Stock',
						},
					],
				})
				break
			case 'Editar':
				setModal(!modal)
				setContentModal({
					title: 'Editar Producto',
					button: 'Editar',
					inputs: [
						{
							type: 'text',
							name: 'categoria',
							placeholder: 'Categoria',
						},
						{
							type: 'text',
							name: 'nombre_p',
							placeholder: 'Nombre Producto',
						},
						{
							type: 'number',
							name: 'precio_p',
							placeholder: 'Precio',
						},
						{
							type: 'number',
							name: 'cantidad_disponible',
							placeholder: 'Cantidad en Stock',
						},
					],
				})
				break
			case 'Eliminar':
				setModal(!modal)
				setContentModal({
					title: 'Eliminar Producto',
					button: 'Eliminar',
					inputs: [
						{
							type: 'text',
							name: 'id_producto',
							placeholder: 'ID',
						},
					],
				})
				break
			default:
				break
		}
	}

	const handleProducts = async productData => {
		if (contentModal.title === 'Agregar Producto') {
			handleSetProducts(productData)
		} else if (contentModal.title === 'Editar Producto') {
			handleUpdateProduct(productData)
		} else if (contentModal.title === 'Eliminar Producto') {
			handleDeleteProduct(productData.id_producto)
		}
	}

	const handleRowClick = row => {
		setProductSelected({
			categoria: row.categoria || '',
			nombre_p: row.nombre_p || '',
			precio_p: row.precio_p || '',
			cantidad_disponible: row.cantidad_disponible || '',
			id_producto: row.id_producto || '',
		})
	}

	return (
		<>
			<PageSchema
				title={title}
				columns={columns}
				data={Array.isArray(products) ? products : []}
				actions={actions}
				activeModal={handleModal}
				handleRowClick={handleRowClick}
				dataInitialState={productSelectedState}
			/>
			<ModalAdmin
				active={modal}
				setActive={setModal}
				content={contentModal}
				setData={handleProducts}
				rowSelected={productSelected}
			/>
			<Error error={errorModal} />
		</>
	)
}

export default Products
