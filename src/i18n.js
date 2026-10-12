
import { createI18n } from 'vue-i18n'

export const i18n = createI18n({
    legacy: false,
    locale: 'en',
    fallbackLocale: 'en',
    messages: {
        en: {
            home: 'Home',
            myCellars: 'My Wine Cellars',
            newItem: 'New Storage Item',
            addWine: 'Add Wine Bottles to Your Cellar',
            wineType: 'Wine Type',
            wine: 'Wine',
            quantity: 'Quantity',
            totalBottles: 'Total Bottles',
            availableCapacity: 'Available Capacity',
            storedWines: 'Stored Wines',
            empty: 'Empty',
            unknownWine: 'Unknown wine',
            bottles: 'bottles',
            cancel: 'Cancel',
            create: 'Create',
            selectType: 'Select wine type',
            selectWine: 'Select wine',
            selectRequired: 'Select a wine type and wine',
            noCellar: 'No cellar available for this wine type',
            invalidQuantity: 'Enter a valid quantity',
            notEnoughCapacity: 'Not enough capacity',
            loadError: 'Could not load data',
            wineLoadError: 'Could not load wines',
            saveError: 'Could not save storage item'
        },
        es: {
            home: 'Inicio',
            myCellars: 'Mis bodegas',
            newItem: 'Nuevo almacenamiento',
            addWine: 'Agrega botellas de vino a tu bodega',
            wineType: 'Tipo de vino',
            wine: 'Vino',
            quantity: 'Cantidad',
            totalBottles: 'Total de botellas',
            availableCapacity: 'Capacidad disponible',
            storedWines: 'Vinos almacenados',
            empty: 'Vacío',
            unknownWine: 'Vino desconocido',
            bottles: 'botellas',
            cancel: 'Cancelar',
            create: 'Crear',
            selectType: 'Selecciona el tipo de vino',
            selectWine: 'Selecciona un vino',
            selectRequired: 'Selecciona un tipo de vino y un vino',
            noCellar: 'No existe una bodega para este tipo de vino',
            invalidQuantity: 'Ingresa una cantidad válida',
            notEnoughCapacity: 'No hay suficiente capacidad',
            loadError: 'No se pudieron cargar los datos',
            wineLoadError: 'No se pudieron cargar los vinos',
            saveError: 'No se pudo guardar el vino'
        }
    }
})
