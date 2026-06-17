import { useTranslation } from 'react-i18next';

const COUNTRIES = [
  { code: '+212', label: '🇲🇦 +212 Maroc' },
  { code: '+213', label: '🇩🇿 +213 Algérie' },
  { code: '+216', label: '🇹🇳 +216 Tunisie' },
  { code: '+33', label: '🇫🇷 +33 France' },
  { code: '+34', label: '🇪🇸 +34 Espagne' },
  { code: '+1', label: '🇺🇸 +1 USA/Canada' },
  { code: '+44', label: '🇬🇧 +44 UK' },
  { code: '+49', label: '🇩🇪 +49 Allemagne' },
  { code: '+32', label: '🇧🇪 +32 Belgique' },
  { code: '+41', label: '🇨🇭 +41 Suisse' },
  { code: '+31', label: '🇳🇱 +31 Pays-Bas' },
  { code: '+39', label: '🇮🇹 +39 Italie' },
  { code: '+351', label: '🇵🇹 +351 Portugal' },
  { code: '+46', label: '🇸🇪 +46 Suède' },
  { code: '+45', label: '🇩🇰 +45 Danemark' },
  { code: '+358', label: '🇫🇮 +358 Finlande' },
  { code: '+30', label: '🇬🇷 +30 Grèce' },
  { code: '+90', label: '🇹🇷 +90 Turquie' },
  { code: '+20', label: '🇪🇬 +20 Égypte' },
  { code: '+966', label: '🇸🇦 +966 Arabie Saoudite' },
  { code: '+971', label: '🇦🇪 +971 Émirats' },
  { code: '+974', label: '🇶🇦 +974 Qatar' },
  { code: '+965', label: '🇰🇼 +965 Koweït' },
  { code: '+222', label: '🇲🇷 +222 Mauritanie' },
  { code: '+221', label: '🇸🇳 +221 Sénégal' },
  { code: '+225', label: '🇨🇮 +225 Côte d\'Ivoire' },
  { code: '+229', label: '🇧🇯 +229 Bénin' },
];

function extractPrefix(val) {
  if (!val || !val.startsWith('+')) return '+212';
  const m = val.match(/^\+(\d{1,3})/);
  return m ? '+' + m[1] : '+212';
}

export default function PhoneInput({ value, onChange, error }) {
  const { t } = useTranslation();
  const prefix = extractPrefix(value);
  const local = value.startsWith(prefix) ? value.slice(prefix.length) : '';

  const handlePrefix = (e) => {
    onChange(e.target.value + local);
  };

  const handleLocal = (e) => {
    const digits = e.target.value.replace(/\D/g, '');
    onChange(prefix + digits);
  };

  return (
    <div>
      <label className="form-label" htmlFor="telephone">{t('form.telephone')}</label>
      <div className="input-group">
        <select className="form-select" style={{ maxWidth: '170px', flex: '0 0 auto' }}
          value={prefix} onChange={handlePrefix}>
          {COUNTRIES.map((c) => (
            <option key={c.code} value={c.code}>{c.label}</option>
          ))}
        </select>
        <input id="telephone" name="telephone"
          className={`form-control${error ? ' is-invalid' : ''}`}
          value={local} onChange={handleLocal}
          placeholder={t('form.telephone.placeholder')} />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
}
