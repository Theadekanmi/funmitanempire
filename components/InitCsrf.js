// components/InitCsrf.js
'use client'
import { useEffect } from 'react';
import { ensureCsrf } from '@/utils/http';

export default function InitCsrf() {
  useEffect(() => { ensureCsrf(); }, []);
  return null;
}
