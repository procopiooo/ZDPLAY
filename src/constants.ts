/**
 * CONFIGURAÇÕES DA ZDR PLAY
 * 
 * Edite os valores abaixo para alterar os preços, nomes e benefícios dos planos.
 */

export const PLANS = [
  {
    id: "mensal",
    name: "Mensal",
    price: "29,99",
    period: "/mês",
    features: [
      "Acesso Completo",
      "Qualidade Ultra HD",
      "Suporte 24/7"
    ],
    isFeatured: false,
    buttonText: "Assinar Agora",
    whatsappLink: "https://wa.me/5544988048355?text=Olá!%20Gostaria%20de%20assinar%20o%20plano%20Mensal."
  },
  {
    id: "anual",
    name: "Anual",
    price: "300",
    period: "/ano",
    features: [
      "Acesso Completo",
      "Economia de 2 meses",
      "Qualidade Ultra HD",
      "Suporte Prioritário"
    ],
    isFeatured: true,
    badge: "Melhor Valor",
    buttonText: "Assinar Agora",
    whatsappLink: "https://wa.me/5544988048355?text=Olá!%20Gostaria%20de%20assinar%20o%20plano%20Anual."
  }
];

export const CONTACTS = {
  whatsapp: "https://wa.me/5544988048355?text=Olá!%20Gostaria%20de%20saber%20mais%20sobre%20a%20ZDR%20PLAY.",
  instagram: "https://www.instagram.com/zdrplay/?utm_source=ig_web_button_share_sheet"
};
