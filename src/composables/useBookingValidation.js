import { computed } from 'vue'

export function validateBooking(form) {
  if (!form.check_in || !form.check_out) {
    return 'Informe as duas datas.'
  }
  if (new Date(form.check_out) <= new Date(form.check_in)) {
    return 'A data de check-out precisa ser depois do check-in.'
  }
  if ((form.guests_count || 0) < 1) {
    return 'Nº de hóspedes deve ser ≥ 1.'
  }
  return null
}

export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  const diff = (new Date(checkOut) - new Date(checkIn)) / 86400000
  return diff > 0 ? diff : 0
}

export function useBookingValidation(formRef, dailyRateRef) {
  const nights = computed(() => nightsBetween(formRef.value.check_in, formRef.value.check_out))

  const total = computed(() => {
    const rate = dailyRateRef?.value || 0
    return nights.value * rate
  })

  function validate() {
    return validateBooking(formRef.value)
  }

  return { nights, total, validate }
}
