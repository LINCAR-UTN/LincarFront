// Importa el componente de filtro de búsqueda
import { SearchFilterComponent } from "@shared/components/search-filter/search-filter.component"

// Método para gestionar la selección de fechas
export function DatesFilter(component: any) {
    // Crea un array de filtro de fechas con la estructura específica
    let datesFilterArray = [
        {
            labelDate: component.component.datesFilterArray[0], // Etiqueta para la fecha (posiblemente el primer elemento del array)
            dateIni: component.component.filters.startDate, // Fecha de inicio del rango seleccionado
            dateFin: component.component.filters.endDate // Fecha de fin del rango seleccionado
        },
        {
            
        }
    ]

    // Abre un cuadro de diálogo (SearchFilterComponent) y pasa el array de filtro de fechas como datos
    let dialogDatesFilter = component._dialog.open(SearchFilterComponent, {
        width: '380px',
        data: datesFilterArray
    })

    // Suscribe a cambios en el filtro de fechas seleccionadas en el cuadro de diálogo
    dialogDatesFilter.componentInstance.datesFilter.subscribe((data) => {
        // Actualiza las fechas de inicio y fin en el filtro principal
        component.component.filters.startDate = data.startDate
        component.component.filters.endDate = data.endDate

        // Verifica si algún filtro de fecha está activo
        let filter_active = false
        // Itera sobre las propiedades del objeto de fechas seleccionadas
        Object.entries(data).forEach(([key, value]) => {
            // Si se encuentra al menos un valor no nulo, activa el filtro
            if (value != null && filter_active == false) {
                filter_active = true
            }
        })

        // Actualiza la propiedad que indica si hay filtros de fechas activos
        component.component.filters_dates_active = filter_active
        // Cierra el cuadro de diálogo
        dialogDatesFilter.close(true)
    })

    // Suscribe a eventos después de cerrar el cuadro de diálogo
    dialogDatesFilter.afterClosed().subscribe((data: any) => {
        // Si el cuadro de diálogo se cerró con confirmación, llama al método formatGetInputs en el componente principal
        if (data) {
            component.formatGetInputs()
        }
    })
}