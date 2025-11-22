

export interface Document {
    name: string;
    url: string;
    type: 'pdf' | 'pptx' | 'docx' | 'other';
    size: string;
  }
  
  export interface Event {
    id: string;
    title: string;
    date: string; // ISO date string
    time: string;
    location: string;
    description: string;
    detailedContent: string;
    type: 'Eğitim' | 'Danışmanlık' | 'Etkinlik';
    image: string;
    gallery: string[];
    documents: Document[];
    capacity: number;
    registeredCount: number;
    keyTakeaways: string[];
    organizerContact: string;
  }
  
  export interface Registration {
    eventId: string;
    fullName: string;
    companyName: string;
    email: string;
  }

  export interface Company {
    id: string;
    name: string;
    type: string;
    color: string; // Tailwind text class for logo color e.g. "text-blue-600"
    description: string;
    website: string;
    email: string;
    phone: string;
    stats: {
      founded: number;
      employees: number;
      exportCountries: number;
    };
    products: string[];
  }
  
  // Initial Mock Data
  export const MOCK_EVENTS: Event[] = [
    {
      id: '1',
      title: 'Dijital Dönüşüm ve E-Ticaret Eğitimi',
      date: '2024-06-15',
      time: '09:30 - 17:00',
      location: 'İTSO Konferans Salonu',
      description: 'Firmalarımızın dijital dünyada rekabet edebilirliğini artırmak için kapsamlı e-ticaret eğitimi.',
      detailedContent: 'Bu eğitimde, e-ticaret altyapıları, dijital pazarlama stratejileri, SEO optimizasyonu ve sosyal medya yönetimi konuları detaylıca ele alınacaktır. Katılımcılar kendi e-ticaret yol haritalarını oluşturabilecek seviyeye gelecektir.',
      type: 'Eğitim',
      image: 'https://picsum.photos/800/400?random=1',
      gallery: [
        'https://picsum.photos/800/600?random=101',
        'https://picsum.photos/800/600?random=102',
        'https://picsum.photos/800/600?random=103',
        'https://picsum.photos/800/600?random=104'
      ],
      documents: [
        { name: 'Sunum Dosyası.pptx', url: '#', type: 'pptx', size: '4.2 MB' },
        { name: 'E-Ticaret Rehberi.pdf', url: '#', type: 'pdf', size: '1.8 MB' }
      ],
      capacity: 50,
      registeredCount: 32,
      keyTakeaways: [
        'Sektörel yenilikler ve global trendler',
        'Uygulamalı vaka analizleri',
        'Uzman eğitmenlerden mentorluk',
        'Profesyonel networking fırsatları'
      ],
      organizerContact: '0326 614 00 01'
    },
    {
      id: '2',
      title: 'URGE Kümelenme Danışmanlığı Başlangıç Toplantısı',
      date: '2024-06-20',
      time: '14:00 - 16:00',
      location: 'İTSO Meclis Salonu',
      description: 'Proje kapsamındaki firmaların ihtiyaç analizlerinin yapılacağı ilk danışmanlık toplantısı.',
      detailedContent: 'URGE projemizin ikinci fazı olan ihtiyaç analizi sürecini başlatıyoruz. Danışman firmamız ile tanışma ve yol haritasının belirlenmesi amacıyla tüm katılımcı firmalarımızın katılımı önem arz etmektedir.',
      type: 'Danışmanlık',
      image: 'https://picsum.photos/800/400?random=2',
      gallery: [
        'https://picsum.photos/800/600?random=201',
        'https://picsum.photos/800/600?random=202'
      ],
      documents: [
        { name: 'İhtiyaç Analizi Formu.docx', url: '#', type: 'docx', size: '150 KB' }
      ],
      capacity: 30,
      registeredCount: 15,
      keyTakeaways: [
        'İhtiyaç analizi yol haritası',
        'Birebir danışmanlık takvimi oluşturma',
        'Devlet teşvikleri bilgilendirmesi'
      ],
      organizerContact: '0326 614 00 02'
    },
    {
      id: '3',
      title: 'Sektörel Yurtdışı Pazarlama Faaliyeti',
      date: '2024-07-10',
      time: '09:00 - 18:00',
      location: 'Berlin, Almanya',
      description: 'Metal sektöründeki firmalarımız için Almanya B2B görüşmeleri.',
      detailedContent: 'Almanya\'nın Berlin kentinde düzenlenecek olan sektörel ticaret heyeti organizasyonudur. İkili iş görüşmeleri (B2B) ve tesis ziyaretlerini kapsamaktadır.',
      type: 'Etkinlik',
      image: 'https://picsum.photos/800/400?random=3',
      gallery: [
         'https://picsum.photos/800/600?random=301',
         'https://picsum.photos/800/600?random=302',
         'https://picsum.photos/800/600?random=303',
         'https://picsum.photos/800/600?random=304',
         'https://picsum.photos/800/600?random=305'
      ],
      documents: [],
      capacity: 15,
      registeredCount: 8,
      keyTakeaways: [
        'Yurt dışı pazar analizi',
        'Potansiyel alıcılarla B2B görüşmeler',
        'Almanya pazar dinamikleri eğitimi'
      ],
      organizerContact: '0326 614 00 03'
    }
  ];
