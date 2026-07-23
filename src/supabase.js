import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://rpdgftnuooxlqhteqqbw.supabase.co'
const supabaseAnonKey = 'sb_publishable_QykeSg2BYgdaAfjEUpF1Iw_UNrfxmTD' // Reemplazá con la clave completa que copiaste

export const supabase = createClient(supabaseUrl, supabaseAnonKey)