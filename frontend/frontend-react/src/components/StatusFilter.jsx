import { useTranslation } from 'react-i18next';

export default function StatusFilter({ value, onChange }) {
  const { t } = useTranslation();
  const options = [
    { value: '', label: '' },
    { value: 'EN_ATTENTE', label: t('form.statut.enAttente') },
    { value: 'CONFIRME', label: t('form.statut.confirme') },
    { value: 'ANNULE', label: t('form.statut.annule') },
    { value: 'TERMINE', label: t('form.statut.termine') },
  ];

  return (
    <select className="form-select" value={value} onChange={(e) => onChange(e.target.value)}>
      <option value="">{t('common.filtrer')}</option>
      {options.filter(o => o.value).map((o) => (
        <option key={o.value} value={o.value}>{o.label}</option>
      ))}
    </select>
  );
}
