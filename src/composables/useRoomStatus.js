const palette = {
  AVAILABLE: { label: 'Disponível', color: 'positive', action: 'Reservar agora' },
  OCCUPIED: { label: 'Ocupado', color: 'grey-7', action: 'Indisponível' },
  MAINTENANCE: { label: 'Manutenção', color: 'negative', action: 'Indisponível' },
}
const fallback = { label: 'Não disponível', color: 'negative', action: 'Indisponível' }

export function useRoomStatus() {
  function statusLabel(room) {
    return palette[room?.status] || fallback
  }
  return { statusLabel }
}
