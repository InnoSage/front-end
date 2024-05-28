// from https://gist.github.com/ksafranski/2973986

export interface Currency {
    symbol: string,
    name: string,
    symbolNative: string,
    decimalDigit: number,
    rounding: number,
    code: string,
    namePlural: string,
    namePluralNative: string
}

/*
const CurrencyMap = {
    USD: {
        symbol: "$",
        name: "US Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "USD",
        namePlural: "US dollars"
    },
    CAD: {
        symbol: "CA$",
        name: "Canadian Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "CAD",
        namePlural: "Canadian dollars"
    },
    EUR: {
        symbol: "€",
        name: "Euro",
        symbolNative: "€",
        decimalDigit: 2,
        rounding: 0,
        code: "EUR",
        namePlural: "euros"
    },
    AED: {
        symbol: "AED",
        name: "United Arab Emirates Dirham",
        symbolNative: "د.إ.‏",
        decimalDigit: 2,
        rounding: 0,
        code: "AED",
        namePlural: "UAE dirhams"
    },
    AFN: {
        symbol: "Af",
        name: "Afghan Afghani",
        symbolNative: "؋",
        decimalDigit: 0,
        rounding: 0,
        code: "AFN",
        namePlural: "Afghan Afghanis"
    },
    ALL: {
        symbol: "ALL",
        name: "Albanian Lek",
        symbolNative: "Lek",
        decimalDigit: 0,
        rounding: 0,
        code: "ALL",
        namePlural: "Albanian lekë"
    },
    AMD: {
        symbol: "AMD",
        name: "Armenian Dram",
        symbolNative: "դր.",
        decimalDigit: 0,
        rounding: 0,
        code: "AMD",
        namePlural: "Armenian drams"
    },
    ARS: {
        symbol: "AR$",
        name: "Argentine Peso",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "ARS",
        namePlural: "Argentine pesos"
    },
    AUD: {
        symbol: "AU$",
        name: "Australian Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "AUD",
        namePlural: "Australian dollars"
    },
    AZN: {
        symbol: "man.",
        name: "Azerbaijani Manat",
        symbolNative: "ман.",
        decimalDigit: 2,
        rounding: 0,
        code: "AZN",
        namePlural: "Azerbaijani manats"
    },
    BAM: {
        symbol: "KM",
        name: "Bosnia-Herzegovina Convertible Mark",
        symbolNative: "KM",
        decimalDigit: 2,
        rounding: 0,
        code: "BAM",
        namePlural: "Bosnia-Herzegovina convertible marks"
    },
    BDT: {
        symbol: "Tk",
        name: "Bangladeshi Taka",
        symbolNative: "৳",
        decimalDigit: 2,
        rounding: 0,
        code: "BDT",
        namePlural: "Bangladeshi takas"
    },
    BGN: {
        symbol: "BGN",
        name: "Bulgarian Lev",
        symbolNative: "лв.",
        decimalDigit: 2,
        rounding: 0,
        code: "BGN",
        namePlural: "Bulgarian leva"
    },
    BHD: {
        symbol: "BD",
        name: "Bahraini Dinar",
        symbolNative: "د.ب.‏",
        decimalDigit: 3,
        rounding: 0,
        code: "BHD",
        namePlural: "Bahraini dinars"
    },
    BIF: {
        symbol: "FBu",
        name: "Burundian Franc",
        symbolNative: "FBu",
        decimalDigit: 0,
        rounding: 0,
        code: "BIF",
        namePlural: "Burundian francs"
    },
    BND: {
        symbol: "BN$",
        name: "Brunei Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "BND",
        namePlural: "Brunei dollars"
    },
    BOB: {
        symbol: "Bs",
        name: "Bolivian Boliviano",
        symbolNative: "Bs",
        decimalDigit: 2,
        rounding: 0,
        code: "BOB",
        namePlural: "Bolivian bolivianos"
    },
    BRL: {
        symbol: "R$",
        name: "Brazilian Real",
        symbolNative: "R$",
        decimalDigit: 2,
        rounding: 0,
        code: "BRL",
        namePlural: "Brazilian reals"
    },
    BWP: {
        symbol: "BWP",
        name: "Botswanan Pula",
        symbolNative: "P",
        decimalDigit: 2,
        rounding: 0,
        code: "BWP",
        namePlural: "Botswanan pulas"
    },
    BYN: {
        symbol: "Br",
        name: "Belarusian Ruble",
        symbolNative: "руб.",
        decimalDigit: 2,
        rounding: 0,
        code: "BYN",
        namePlural: "Belarusian rubles"
    },
    BZD: {
        symbol: "BZ$",
        name: "Belize Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "BZD",
        namePlural: "Belize dollars"
    },
    CDF: {
        symbol: "CDF",
        name: "Congolese Franc",
        symbolNative: "FrCD",
        decimalDigit: 2,
        rounding: 0,
        code: "CDF",
        namePlural: "Congolese francs"
    },
    CHF: {
        symbol: "CHF",
        name: "Swiss Franc",
        symbolNative: "CHF",
        decimalDigit: 2,
        rounding: 0.05,
        code: "CHF",
        namePlural: "Swiss francs"
    },
    CLP: {
        symbol: "CL$",
        name: "Chilean Peso",
        symbolNative: "$",
        decimalDigit: 0,
        rounding: 0,
        code: "CLP",
        namePlural: "Chilean pesos"
    },
    CNY: {
        symbol: "CN¥",
        name: "Chinese Yuan",
        symbolNative: "CN¥",
        decimalDigit: 2,
        rounding: 0,
        code: "CNY",
        namePlural: "Chinese yuan"
    },
    COP: {
        symbol: "CO$",
        name: "Colombian Peso",
        symbolNative: "$",
        decimalDigit: 0,
        rounding: 0,
        code: "COP",
        namePlural: "Colombian pesos"
    },
    CRC: {
        symbol: "₡",
        name: "Costa Rican Colón",
        symbolNative: "₡",
        decimalDigit: 0,
        rounding: 0,
        code: "CRC",
        namePlural: "Costa Rican colóns"
    },
    CVE: {
        symbol: "CV$",
        name: "Cape Verdean Escudo",
        symbolNative: "CV$",
        decimalDigit: 2,
        rounding: 0,
        code: "CVE",
        namePlural: "Cape Verdean escudos"
    },
    CZK: {
        symbol: "Kč",
        name: "Czech Republic Koruna",
        symbolNative: "Kč",
        decimalDigit: 2,
        rounding: 0,
        code: "CZK",
        namePlural: "Czech Republic korunas"
    },
    DJF: {
        symbol: "Fdj",
        name: "Djiboutian Franc",
        symbolNative: "Fdj",
        decimalDigit: 0,
        rounding: 0,
        code: "DJF",
        namePlural: "Djiboutian francs"
    },
    DKK: {
        symbol: "Dkr",
        name: "Danish Krone",
        symbolNative: "kr",
        decimalDigit: 2,
        rounding: 0,
        code: "DKK",
        namePlural: "Danish kroner"
    },
    DOP: {
        symbol: "RD$",
        name: "Dominican Peso",
        symbolNative: "RD$",
        decimalDigit: 2,
        rounding: 0,
        code: "DOP",
        namePlural: "Dominican pesos"
    },
    DZD: {
        symbol: "DA",
        name: "Algerian Dinar",
        symbolNative: "د.ج.‏",
        decimalDigit: 2,
        rounding: 0,
        code: "DZD",
        namePlural: "Algerian dinars"
    },
    EEK: {
        symbol: "Ekr",
        name: "Estonian Kroon",
        symbolNative: "kr",
        decimalDigit: 2,
        rounding: 0,
        code: "EEK",
        namePlural: "Estonian kroons"
    },
    EGP: {
        symbol: "EGP",
        name: "Egyptian Pound",
        symbolNative: "ج.م.‏",
        decimalDigit: 2,
        rounding: 0,
        code: "EGP",
        namePlural: "Egyptian pounds"
    },
    ERN: {
        symbol: "Nfk",
        name: "Eritrean Nakfa",
        symbolNative: "Nfk",
        decimalDigit: 2,
        rounding: 0,
        code: "ERN",
        namePlural: "Eritrean nakfas"
    },
    ETB: {
        symbol: "Br",
        name: "Ethiopian Birr",
        symbolNative: "Br",
        decimalDigit: 2,
        rounding: 0,
        code: "ETB",
        namePlural: "Ethiopian birrs"
    },
    GBP: {
        symbol: "£",
        name: "British Pound Sterling",
        symbolNative: "£",
        decimalDigit: 2,
        rounding: 0,
        code: "GBP",
        namePlural: "British pounds sterling"
    },
    GEL: {
        symbol: "GEL",
        name: "Georgian Lari",
        symbolNative: "GEL",
        decimalDigit: 2,
        rounding: 0,
        code: "GEL",
        namePlural: "Georgian laris"
    },
    GHS: {
        symbol: "GH₵",
        name: "Ghanaian Cedi",
        symbolNative: "GH₵",
        decimalDigit: 2,
        rounding: 0,
        code: "GHS",
        namePlural: "Ghanaian cedis"
    },
    GNF: {
        symbol: "FG",
        name: "Guinean Franc",
        symbolNative: "FG",
        decimalDigit: 0,
        rounding: 0,
        code: "GNF",
        namePlural: "Guinean francs"
    },
    GTQ: {
        symbol: "GTQ",
        name: "Guatemalan Quetzal",
        symbolNative: "Q",
        decimalDigit: 2,
        rounding: 0,
        code: "GTQ",
        namePlural: "Guatemalan quetzals"
    },
    HKD: {
        symbol: "HK$",
        name: "Hong Kong Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "HKD",
        namePlural: "Hong Kong dollars"
    },
    HNL: {
        symbol: "HNL",
        name: "Honduran Lempira",
        symbolNative: "L",
        decimalDigit: 2,
        rounding: 0,
        code: "HNL",
        namePlural: "Honduran lempiras"
    },
    HRK: {
        symbol: "kn",
        name: "Croatian Kuna",
        symbolNative: "kn",
        decimalDigit: 2,
        rounding: 0,
        code: "HRK",
        namePlural: "Croatian kunas"
    },
    HUF: {
        symbol: "Ft",
        name: "Hungarian Forint",
        symbolNative: "Ft",
        decimalDigit: 0,
        rounding: 0,
        code: "HUF",
        namePlural: "Hungarian forints"
    },
    IDR: {
        symbol: "Rp",
        name: "Indonesian Rupiah",
        symbolNative: "Rp",
        decimalDigit: 0,
        rounding: 0,
        code: "IDR",
        namePlural: "Indonesian rupiahs"
    },
    ILS: {
        symbol: "₪",
        name: "Israeli New Sheqel",
        symbolNative: "₪",
        decimalDigit: 2,
        rounding: 0,
        code: "ILS",
        namePlural: "Israeli new sheqels"
    },
    INR: {
        symbol: "Rs",
        name: "Indian Rupee",
        symbolNative: "টকা",
        decimalDigit: 2,
        rounding: 0,
        code: "INR",
        namePlural: "Indian rupees"
    },
    IQD: {
        symbol: "IQD",
        name: "Iraqi Dinar",
        symbolNative: "د.ع.‏",
        decimalDigit: 0,
        rounding: 0,
        code: "IQD",
        namePlural: "Iraqi dinars"
    },
    IRR: {
        symbol: "IRR",
        name: "Iranian Rial",
        symbolNative: "﷼",
        decimalDigit: 0,
        rounding: 0,
        code: "IRR",
        namePlural: "Iranian rials"
    },
    ISK: {
        symbol: "Ikr",
        name: "Icelandic Króna",
        symbolNative: "kr",
        decimalDigit: 0,
        rounding: 0,
        code: "ISK",
        namePlural: "Icelandic krónur"
    },
    JMD: {
        symbol: "J$",
        name: "Jamaican Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "JMD",
        namePlural: "Jamaican dollars"
    },
    JOD: {
        symbol: "JD",
        name: "Jordanian Dinar",
        symbolNative: "د.أ.‏",
        decimalDigit: 3,
        rounding: 0,
        code: "JOD",
        namePlural: "Jordanian dinars"
    },
    JPY: {
        symbol: "¥",
        name: "Japanese Yen",
        symbolNative: "￥",
        decimalDigit: 0,
        rounding: 0,
        code: "JPY",
        namePlural: "Japanese yen"
    },
    KES: {
        symbol: "Ksh",
        name: "Kenyan Shilling",
        symbolNative: "Ksh",
        decimalDigit: 2,
        rounding: 0,
        code: "KES",
        namePlural: "Kenyan shillings"
    },
    KHR: {
        symbol: "KHR",
        name: "Cambodian Riel",
        symbolNative: "៛",
        decimalDigit: 2,
        rounding: 0,
        code: "KHR",
        namePlural: "Cambodian riels"
    },
    KMF: {
        symbol: "CF",
        name: "Comorian Franc",
        symbolNative: "FC",
        decimalDigit: 0,
        rounding: 0,
        code: "KMF",
        namePlural: "Comorian francs"
    },
    KRW: {
        symbol: "₩",
        name: "South Korean Won",
        symbolNative: "₩",
        decimalDigit: 0,
        rounding: 0,
        code: "KRW",
        namePlural: "South Korean won"
    },
    KWD: {
        symbol: "KD",
        name: "Kuwaiti Dinar",
        symbolNative: "د.ك.‏",
        decimalDigit: 3,
        rounding: 0,
        code: "KWD",
        namePlural: "Kuwaiti dinars"
    },
    KZT: {
        symbol: "KZT",
        name: "Kazakhstani Tenge",
        symbolNative: "тңг.",
        decimalDigit: 2,
        rounding: 0,
        code: "KZT",
        namePlural: "Kazakhstani tenges"
    },
    LBP: {
        symbol: "L.L.",
        name: "Lebanese Pound",
        symbolNative: "ل.ل.‏",
        decimalDigit: 0,
        rounding: 0,
        code: "LBP",
        namePlural: "Lebanese pounds"
    },
    LKR: {
        symbol: "SLRs",
        name: "Sri Lankan Rupee",
        symbolNative: "SL Re",
        decimalDigit: 2,
        rounding: 0,
        code: "LKR",
        namePlural: "Sri Lankan rupees"
    },
    LTL: {
        symbol: "Lt",
        name: "Lithuanian Litas",
        symbolNative: "Lt",
        decimalDigit: 2,
        rounding: 0,
        code: "LTL",
        namePlural: "Lithuanian litai"
    },
    LVL: {
        symbol: "Ls",
        name: "Latvian Lats",
        symbolNative: "Ls",
        decimalDigit: 2,
        rounding: 0,
        code: "LVL",
        namePlural: "Latvian lati"
    },
    LYD: {
        symbol: "LD",
        name: "Libyan Dinar",
        symbolNative: "د.ل.‏",
        decimalDigit: 3,
        rounding: 0,
        code: "LYD",
        namePlural: "Libyan dinars"
    },
    MAD: {
        symbol: "MAD",
        name: "Moroccan Dirham",
        symbolNative: "د.م.‏",
        decimalDigit: 2,
        rounding: 0,
        code: "MAD",
        namePlural: "Moroccan dirhams"
    },
    MDL: {
        symbol: "MDL",
        name: "Moldovan Leu",
        symbolNative: "MDL",
        decimalDigit: 2,
        rounding: 0,
        code: "MDL",
        namePlural: "Moldovan lei"
    },
    MGA: {
        symbol: "MGA",
        name: "Malagasy Ariary",
        symbolNative: "MGA",
        decimalDigit: 0,
        rounding: 0,
        code: "MGA",
        namePlural: "Malagasy Ariaries"
    },
    MKD: {
        symbol: "MKD",
        name: "Macedonian Denar",
        symbolNative: "MKD",
        decimalDigit: 2,
        rounding: 0,
        code: "MKD",
        namePlural: "Macedonian denari"
    },
    MMK: {
        symbol: "MMK",
        name: "Myanma Kyat",
        symbolNative: "K",
        decimalDigit: 0,
        rounding: 0,
        code: "MMK",
        namePlural: "Myanma kyats"
    },
    MOP: {
        symbol: "MOP$",
        name: "Macanese Pataca",
        symbolNative: "MOP$",
        decimalDigit: 2,
        rounding: 0,
        code: "MOP",
        namePlural: "Macanese patacas"
    },
    MUR: {
        symbol: "MURs",
        name: "Mauritian Rupee",
        symbolNative: "MURs",
        decimalDigit: 0,
        rounding: 0,
        code: "MUR",
        namePlural: "Mauritian rupees"
    },
    MXN: {
        symbol: "MX$",
        name: "Mexican Peso",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "MXN",
        namePlural: "Mexican pesos"
    },
    MYR: {
        symbol: "RM",
        name: "Malaysian Ringgit",
        symbolNative: "RM",
        decimalDigit: 2,
        rounding: 0,
        code: "MYR",
        namePlural: "Malaysian ringgits"
    },
    MZN: {
        symbol: "MTn",
        name: "Mozambican Metical",
        symbolNative: "MTn",
        decimalDigit: 2,
        rounding: 0,
        code: "MZN",
        namePlural: "Mozambican meticals"
    },
    NAD: {
        symbol: "N$",
        name: "Namibian Dollar",
        symbolNative: "N$",
        decimalDigit: 2,
        rounding: 0,
        code: "NAD",
        namePlural: "Namibian dollars"
    },
    NGN: {
        symbol: "₦",
        name: "Nigerian Naira",
        symbolNative: "₦",
        decimalDigit: 2,
        rounding: 0,
        code: "NGN",
        namePlural: "Nigerian nairas"
    },
    NIO: {
        symbol: "C$",
        name: "Nicaraguan Córdoba",
        symbolNative: "C$",
        decimalDigit: 2,
        rounding: 0,
        code: "NIO",
        namePlural: "Nicaraguan córdobas"
    },
    NOK: {
        symbol: "Nkr",
        name: "Norwegian Krone",
        symbolNative: "kr",
        decimalDigit: 2,
        rounding: 0,
        code: "NOK",
        namePlural: "Norwegian kroner"
    },
    NPR: {
        symbol: "NPRs",
        name: "Nepalese Rupee",
        symbolNative: "नेरू",
        decimalDigit: 2,
        rounding: 0,
        code: "NPR",
        namePlural: "Nepalese rupees"
    },
    NZD: {
        symbol: "NZ$",
        name: "New Zealand Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "NZD",
        namePlural: "New Zealand dollars"
    },
    OMR: {
        symbol: "OMR",
        name: "Omani Rial",
        symbolNative: "ر.ع.‏",
        decimalDigit: 3,
        rounding: 0,
        code: "OMR",
        namePlural: "Omani rials"
    },
    PAB: {
        symbol: "B/.",
        name: "Panamanian Balboa",
        symbolNative: "B/.",
        decimalDigit: 2,
        rounding: 0,
        code: "PAB",
        namePlural: "Panamanian balboas"
    },
    PEN: {
        symbol: "S/.",
        name: "Peruvian Nuevo Sol",
        symbolNative: "S/.",
        decimalDigit: 2,
        rounding: 0,
        code: "PEN",
        namePlural: "Peruvian nuevos soles"
    },
    PHP: {
        symbol: "₱",
        name: "Philippine Peso",
        symbolNative: "₱",
        decimalDigit: 2,
        rounding: 0,
        code: "PHP",
        namePlural: "Philippine pesos"
    },
    PKR: {
        symbol: "PKRs",
        name: "Pakistani Rupee",
        symbolNative: "₨",
        decimalDigit: 0,
        rounding: 0,
        code: "PKR",
        namePlural: "Pakistani rupees"
    },
    PLN: {
        symbol: "zł",
        name: "Polish Zloty",
        symbolNative: "zł",
        decimalDigit: 2,
        rounding: 0,
        code: "PLN",
        namePlural: "Polish zlotys"
    },
    PYG: {
        symbol: "₲",
        name: "Paraguayan Guarani",
        symbolNative: "₲",
        decimalDigit: 0,
        rounding: 0,
        code: "PYG",
        namePlural: "Paraguayan guaranis"
    },
    QAR: {
        symbol: "QR",
        name: "Qatari Rial",
        symbolNative: "ر.ق.‏",
        decimalDigit: 2,
        rounding: 0,
        code: "QAR",
        namePlural: "Qatari rials"
    },
    RON: {
        symbol: "RON",
        name: "Romanian Leu",
        symbolNative: "RON",
        decimalDigit: 2,
        rounding: 0,
        code: "RON",
        namePlural: "Romanian lei"
    },
    RSD: {
        symbol: "din.",
        name: "Serbian Dinar",
        symbolNative: "дин.",
        decimalDigit: 0,
        rounding: 0,
        code: "RSD",
        namePlural: "Serbian dinars"
    },
    RUB: {
        symbol: "RUB",
        name: "Russian Ruble",
        symbolNative: "₽.",
        decimalDigit: 2,
        rounding: 0,
        code: "RUB",
        namePlural: "Russian rubles"
    },
    RWF: {
        symbol: "RWF",
        name: "Rwandan Franc",
        symbolNative: "FR",
        decimalDigit: 0,
        rounding: 0,
        code: "RWF",
        namePlural: "Rwandan francs"
    },
    SAR: {
        symbol: "SR",
        name: "Saudi Riyal",
        symbolNative: "ر.س.‏",
        decimalDigit: 2,
        rounding: 0,
        code: "SAR",
        namePlural: "Saudi riyals"
    },
    SDG: {
        symbol: "SDG",
        name: "Sudanese Pound",
        symbolNative: "SDG",
        decimalDigit: 2,
        rounding: 0,
        code: "SDG",
        namePlural: "Sudanese pounds"
    },
    SEK: {
        symbol: "Skr",
        name: "Swedish Krona",
        symbolNative: "kr",
        decimalDigit: 2,
        rounding: 0,
        code: "SEK",
        namePlural: "Swedish kronor"
    },
    SGD: {
        symbol: "S$",
        name: "Singapore Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "SGD",
        namePlural: "Singapore dollars"
    },
    SOS: {
        symbol: "Ssh",
        name: "Somali Shilling",
        symbolNative: "Ssh",
        decimalDigit: 0,
        rounding: 0,
        code: "SOS",
        namePlural: "Somali shillings"
    },
    SYP: {
        symbol: "SY£",
        name: "Syrian Pound",
        symbolNative: "ل.س.‏",
        decimalDigit: 0,
        rounding: 0,
        code: "SYP",
        namePlural: "Syrian pounds"
    },
    THB: {
        symbol: "฿",
        name: "Thai Baht",
        symbolNative: "฿",
        decimalDigit: 2,
        rounding: 0,
        code: "THB",
        namePlural: "Thai baht"
    },
    TND: {
        symbol: "DT",
        name: "Tunisian Dinar",
        symbolNative: "د.ت.‏",
        decimalDigit: 3,
        rounding: 0,
        code: "TND",
        namePlural: "Tunisian dinars"
    },
    TOP: {
        symbol: "T$",
        name: "Tongan Paʻanga",
        symbolNative: "T$",
        decimalDigit: 2,
        rounding: 0,
        code: "TOP",
        namePlural: "Tongan paʻanga"
    },
    TRY: {
        symbol: "TL",
        name: "Turkish Lira",
        symbolNative: "TL",
        decimalDigit: 2,
        rounding: 0,
        code: "TRY",
        namePlural: "Turkish Lira"
    },
    TTD: {
        symbol: "TT$",
        name: "Trinidad and Tobago Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "TTD",
        namePlural: "Trinidad and Tobago dollars"
    },
    TWD: {
        symbol: "NT$",
        name: "New Taiwan Dollar",
        symbolNative: "NT$",
        decimalDigit: 2,
        rounding: 0,
        code: "TWD",
        namePlural: "New Taiwan dollars"
    },
    TZS: {
        symbol: "TSh",
        name: "Tanzanian Shilling",
        symbolNative: "TSh",
        decimalDigit: 0,
        rounding: 0,
        code: "TZS",
        namePlural: "Tanzanian shillings"
    },
    UAH: {
        symbol: "₴",
        name: "Ukrainian Hryvnia",
        symbolNative: "₴",
        decimalDigit: 2,
        rounding: 0,
        code: "UAH",
        namePlural: "Ukrainian hryvnias"
    },
    UGX: {
        symbol: "USh",
        name: "Ugandan Shilling",
        symbolNative: "USh",
        decimalDigit: 0,
        rounding: 0,
        code: "UGX",
        namePlural: "Ugandan shillings"
    },
    UYU: {
        symbol: "$U",
        name: "Uruguayan Peso",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "UYU",
        namePlural: "Uruguayan pesos"
    },
    UZS: {
        symbol: "UZS",
        name: "Uzbekistan Som",
        symbolNative: "UZS",
        decimalDigit: 0,
        rounding: 0,
        code: "UZS",
        namePlural: "Uzbekistan som"
    },
    VEF: {
        symbol: "Bs.F.",
        name: "Venezuelan Bolívar",
        symbolNative: "Bs.F.",
        decimalDigit: 2,
        rounding: 0,
        code: "VEF",
        namePlural: "Venezuelan bolívars"
    },
    VND: {
        symbol: "₫",
        name: "Vietnamese Dong",
        symbolNative: "₫",
        decimalDigit: 0,
        rounding: 0,
        code: "VND",
        namePlural: "Vietnamese dong"
    },
    XAF: {
        symbol: "FCFA",
        name: "CFA Franc BEAC",
        symbolNative: "FCFA",
        decimalDigit: 0,
        rounding: 0,
        code: "XAF",
        namePlural: "CFA francs BEAC"
    },
    XOF: {
        symbol: "CFA",
        name: "CFA Franc BCEAO",
        symbolNative: "CFA",
        decimalDigit: 0,
        rounding: 0,
        code: "XOF",
        namePlural: "CFA francs BCEAO"
    },
    YER: {
        symbol: "YR",
        name: "Yemeni Rial",
        symbolNative: "ر.ي.‏",
        decimalDigit: 0,
        rounding: 0,
        code: "YER",
        namePlural: "Yemeni rials"
    },
    ZAR: {
        symbol: "R",
        name: "South African Rand",
        symbolNative: "R",
        decimalDigit: 2,
        rounding: 0,
        code: "ZAR",
        namePlural: "South African rand"
    },
    ZMK: {
        symbol: "ZK",
        name: "Zambian Kwacha",
        symbolNative: "ZK",
        decimalDigit: 0,
        rounding: 0,
        code: "ZMK",
        namePlural: "Zambian kwachas"
    },
    ZWL: {
        symbol: "ZWL$",
        name: "Zimbabwean Dollar",
        symbolNative: "ZWL$",
        decimalDigit: 0,
        rounding: 0,
        code: "ZWL",
        namePlural: "Zimbabwean Dollar"
    }
};*/
const CurrencyMap = {
    USD: {
        symbol: "$",
        name: "US Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "USD",
        namePlural: "US dollars",
        namePluralNative: "US dollars"
    },
    CAD: {
        symbol: "CA$",
        name: "Canadian Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "CAD",
        namePlural: "Canadian dollars",
        namePluralNative: "dollars canadiens"
    },
    EUR: {
        symbol: "€",
        name: "Euro",
        symbolNative: "€",
        decimalDigit: 2,
        rounding: 0,
        code: "EUR",
        namePlural: "euros",
        namePluralNative: "euros"
    },
    AED: {
        symbol: "AED",
        name: "United Arab Emirates Dirham",
        symbolNative: "د.إ.‏",
        decimalDigit: 2,
        rounding: 0,
        code: "AED",
        namePlural: "UAE dirhams",
        namePluralNative: "دراهم إماراتية"
    },
    AFN: {
        symbol: "Af",
        name: "Afghan Afghani",
        symbolNative: "؋",
        decimalDigit: 0,
        rounding: 0,
        code: "AFN",
        namePlural: "Afghan Afghanis",
        namePluralNative: "افغانی افغانستان"
    },
    ALL: {
        symbol: "ALL",
        name: "Albanian Lek",
        symbolNative: "Lek",
        decimalDigit: 0,
        rounding: 0,
        code: "ALL",
        namePlural: "Albanian lekë",
        namePluralNative: "lekë shqiptarë"
    },
    AMD: {
        symbol: "AMD",
        name: "Armenian Dram",
        symbolNative: "դր.",
        decimalDigit: 0,
        rounding: 0,
        code: "AMD",
        namePlural: "Armenian drams",
        namePluralNative: "Հայկական դրամներ"
    },
    ARS: {
        symbol: "AR$",
        name: "Argentine Peso",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "ARS",
        namePlural: "Argentine pesos",
        namePluralNative: "pesos argentinos"
    },
    AUD: {
        symbol: "AU$",
        name: "Australian Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "AUD",
        namePlural: "Australian dollars",
        namePluralNative: "Australian dollars"
    },
    AZN: {
        symbol: "man.",
        name: "Azerbaijani Manat",
        symbolNative: "ман.",
        decimalDigit: 2,
        rounding: 0,
        code: "AZN",
        namePlural: "Azerbaijani manats",
        namePluralNative: "Azərbaycan manatları"
    },
    BAM: {
        symbol: "KM",
        name: "Bosnia-Herzegovina Convertible Mark",
        symbolNative: "KM",
        decimalDigit: 2,
        rounding: 0,
        code: "BAM",
        namePlural: "Bosnia-Herzegovina convertible marks",
        namePluralNative: "Konvertibilne marke"
    },
    BDT: {
        symbol: "Tk",
        name: "Bangladeshi Taka",
        symbolNative: "৳",
        decimalDigit: 2,
        rounding: 0,
        code: "BDT",
        namePlural: "Bangladeshi takas",
        namePluralNative: "বাংলাদেশি টাকা"
    },
    BGN: {
        symbol: "BGN",
        name: "Bulgarian Lev",
        symbolNative: "лв.",
        decimalDigit: 2,
        rounding: 0,
        code: "BGN",
        namePlural: "Bulgarian leva",
        namePluralNative: "български лева"
    },
    BHD: {
        symbol: "BD",
        name: "Bahraini Dinar",
        symbolNative: "د.ب.‏",
        decimalDigit: 3,
        rounding: 0,
        code: "BHD",
        namePlural: "Bahraini dinars",
        namePluralNative: "دينار بحريني"
    },
    BIF: {
        symbol: "FBu",
        name: "Burundian Franc",
        symbolNative: "FBu",
        decimalDigit: 0,
        rounding: 0,
        code: "BIF",
        namePlural: "Burundian francs",
        namePluralNative: "francs burundais"
    },
    BND: {
        symbol: "BN$",
        name: "Brunei Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "BND",
        namePlural: "Brunei dollars",
        namePluralNative: "Dolar Brunei"
    },
    BOB: {
        symbol: "Bs",
        name: "Bolivian Boliviano",
        symbolNative: "Bs",
        decimalDigit: 2,
        rounding: 0,
        code: "BOB",
        namePlural: "Bolivian bolivianos",
        namePluralNative: "bolivianos bolivianos"
    },
    BRL: {
        symbol: "R$",
        name: "Brazilian Real",
        symbolNative: "R$",
        decimalDigit: 2,
        rounding: 0,
        code: "BRL",
        namePlural: "Brazilian reals",
        namePluralNative: "reais brasileiros"
    },
    BWP: {
        symbol: "BWP",
        name: "Botswanan Pula",
        symbolNative: "P",
        decimalDigit: 2,
        rounding: 0,
        code: "BWP",
        namePlural: "Botswanan pulas",
        namePluralNative: "Pula ya Botswana"
    },
    BYN: {
        symbol: "Br",
        name: "Belarusian Ruble",
        symbolNative: "руб.",
        decimalDigit: 2,
        rounding: 0,
        code: "BYN",
        namePlural: "Belarusian rubles",
        namePluralNative: "Белорусские рубли"
    },
    BZD: {
        symbol: "BZ$",
        name: "Belize Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "BZD",
        namePlural: "Belize dollars",
        namePluralNative: "dólares de Belice"
    },
    CDF: {
        symbol: "CDF",
        name: "Congolese Franc",
        symbolNative: "FrCD",
        decimalDigit: 2,
        rounding: 0,
        code: "CDF",
        namePlural: "Congolese francs",
        namePluralNative: "francs congolais"
    },
    CHF: {
        symbol: "CHF",
        name: "Swiss Franc",
        symbolNative: "CHF",
        decimalDigit: 2,
        rounding: 0.05,
        code: "CHF",
        namePlural: "Swiss francs",
        namePluralNative: "francs suisses"
    },
    CLP: {
        symbol: "CL$",
        name: "Chilean Peso",
        symbolNative: "$",
        decimalDigit: 0,
        rounding: 0,
        code: "CLP",
        namePlural: "Chilean pesos",
        namePluralNative: "pesos chilenos"
    },
    CNY: {
        symbol: "CN¥",
        name: "Chinese Yuan",
        symbolNative: "CN¥",
        decimalDigit: 2,
        rounding: 0,
        code: "CNY",
        namePlural: "Chinese yuan",
        namePluralNative: "中国人民币"
    },
    COP: {
        symbol: "CO$",
        name: "Colombian Peso",
        symbolNative: "$",
        decimalDigit: 0,
        rounding: 0,
        code: "COP",
        namePlural: "Colombian pesos",
        namePluralNative: "pesos colombianos"
    },
    CRC: {
        symbol: "₡",
        name: "Costa Rican Colón",
        symbolNative: "₡",
        decimalDigit: 0,
        rounding: 0,
        code: "CRC",
        namePlural: "Costa Rican colóns",
        namePluralNative: "colones costarricenses"
    },
    CVE: {
        symbol: "CV$",
        name: "Cape Verdean Escudo",
        symbolNative: "CV$",
        decimalDigit: 2,
        rounding: 0,
        code: "CVE",
        namePlural: "Cape Verdean escudos",
        namePluralNative: "escudos cabo-verdianos"
    },
    CZK: {
        symbol: "Kč",
        name: "Czech Republic Koruna",
        symbolNative: "Kč",
        decimalDigit: 2,
        rounding: 0,
        code: "CZK",
        namePlural: "Czech Republic korunas",
        namePluralNative: "české koruny"
    },
    DJF: {
        symbol: "Fdj",
        name: "Djiboutian Franc",
        symbolNative: "Fdj",
        decimalDigit: 0,
        rounding: 0,
        code: "DJF",
        namePlural: "Djiboutian francs",
        namePluralNative: "francs djiboutiens"
    },
    DKK: {
        symbol: "Dkr",
        name: "Danish Krone",
        symbolNative: "kr",
        decimalDigit: 2,
        rounding: 0,
        code: "DKK",
        namePlural: "Danish kroner",
        namePluralNative: "danske kroner"
    },
    DOP: {
        symbol: "RD$",
        name: "Dominican Peso",
        symbolNative: "RD$",
        decimalDigit: 2,
        rounding: 0,
        code: "DOP",
        namePlural: "Dominican pesos",
        namePluralNative: "pesos dominicanos"
    },
    DZD: {
        symbol: "DA",
        name: "Algerian Dinar",
        symbolNative: "د.ج.‏",
        decimalDigit: 2,
        rounding: 0,
        code: "DZD",
        namePlural: "Algerian dinars",
        namePluralNative: "دينار جزائري"
    },
    EEK: {
        symbol: "Ekr",
        name: "Estonian Kroon",
        symbolNative: "kr",
        decimalDigit: 2,
        rounding: 0,
        code: "EEK",
        namePlural: "Estonian kroons",
        namePluralNative: "Eesti krooni"
    },
    EGP: {
        symbol: "EGP",
        name: "Egyptian Pound",
        symbolNative: "ج.م.‏",
        decimalDigit: 2,
        rounding: 0,
        code: "EGP",
        namePlural: "Egyptian pounds",
        namePluralNative: "جنيهات مصرية"
    },
    ERN: {
        symbol: "Nfk",
        name: "Eritrean Nakfa",
        symbolNative: "Nfk",
        decimalDigit: 2,
        rounding: 0,
        code: "ERN",
        namePlural: "Eritrean nakfas",
        namePluralNative: "ናቕፋ"
    },
    ETB: {
        symbol: "Br",
        name: "Ethiopian Birr",
        symbolNative: "Br",
        decimalDigit: 2,
        rounding: 0,
        code: "ETB",
        namePlural: "Ethiopian birrs",
        namePluralNative: "የኢትዮጵያ ብር"
    },
    GBP: {
        symbol: "£",
        name: "British Pound Sterling",
        symbolNative: "£",
        decimalDigit: 2,
        rounding: 0,
        code: "GBP",
        namePlural: "British pounds",
        namePluralNative: "British pounds"
    },
    GEL: {
        symbol: "GEL",
        name: "Georgian Lari",
        symbolNative: "GEL",
        decimalDigit: 2,
        rounding: 0,
        code: "GEL",
        namePlural: "Georgian laris",
        namePluralNative: "ქართული ლარი"
    },
    GHS: {
        symbol: "GH₵",
        name: "Ghanaian Cedi",
        symbolNative: "GH₵",
        decimalDigit: 2,
        rounding: 0,
        code: "GHS",
        namePlural: "Ghanaian cedis",
        namePluralNative: "Ghanaian cedis"
    },
    GNF: {
        symbol: "FG",
        name: "Guinean Franc",
        symbolNative: "FG",
        decimalDigit: 0,
        rounding: 0,
        code: "GNF",
        namePlural: "Guinean francs",
        namePluralNative: "francs guinéens"
    },
    GTQ: {
        symbol: "GTQ",
        name: "Guatemalan Quetzal",
        symbolNative: "Q",
        decimalDigit: 2,
        rounding: 0,
        code: "GTQ",
        namePlural: "Guatemalan quetzals",
        namePluralNative: "quetzales guatemaltecos"
    },
    HKD: {
        symbol: "HK$",
        name: "Hong Kong Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "HKD",
        namePlural: "Hong Kong dollars",
        namePluralNative: "港元"
    },
    HNL: {
        symbol: "HNL",
        name: "Honduran Lempira",
        symbolNative: "L",
        decimalDigit: 2,
        rounding: 0,
        code: "HNL",
        namePlural: "Honduran lempiras",
        namePluralNative: "lempiras hondureñas"
    },
    HRK: {
        symbol: "kn",
        name: "Croatian Kuna",
        symbolNative: "kn",
        decimalDigit: 2,
        rounding: 0,
        code: "HRK",
        namePlural: "Croatian kunas",
        namePluralNative: "hrvatske kune"
    },
    HUF: {
        symbol: "Ft",
        name: "Hungarian Forint",
        symbolNative: "Ft",
        decimalDigit: 0,
        rounding: 0,
        code: "HUF",
        namePlural: "Hungarian forints",
        namePluralNative: "magyar forintok"
    },
    IDR: {
        symbol: "Rp",
        name: "Indonesian Rupiah",
        symbolNative: "Rp",
        decimalDigit: 0,
        rounding: 0,
        code: "IDR",
        namePlural: "Indonesian rupiahs",
        namePluralNative: "rupiah Indonesia"
    },
    ILS: {
        symbol: "₪",
        name: "Israeli New Sheqel",
        symbolNative: "₪",
        decimalDigit: 2,
        rounding: 0,
        code: "ILS",
        namePlural: "Israeli new sheqels",
        namePluralNative: "שקלים חדשים"
    },
    INR: {
        symbol: "Rs",
        name: "Indian Rupee",
        symbolNative: "টকা",
        decimalDigit: 2,
        rounding: 0,
        code: "INR",
        namePlural: "Indian rupees",
        namePluralNative: "भारतीय रुपए"
    },
    IQD: {
        symbol: "IQD",
        name: "Iraqi Dinar",
        symbolNative: "د.ع.‏",
        decimalDigit: 0,
        rounding: 0,
        code: "IQD",
        namePlural: "Iraqi dinars",
        namePluralNative: "دينار عراقي"
    },
    IRR: {
        symbol: "IRR",
        name: "Iranian Rial",
        symbolNative: "﷼",
        decimalDigit: 0,
        rounding: 0,
        code: "IRR",
        namePlural: "Iranian rials",
        namePluralNative: "ریال ایران"
    },
    ISK: {
        symbol: "Ikr",
        name: "Icelandic Króna",
        symbolNative: "kr",
        decimalDigit: 0,
        rounding: 0,
        code: "ISK",
        namePlural: "Icelandic krónur",
        namePluralNative: "íslenskar krónur"
    },
    JMD: {
        symbol: "J$",
        name: "Jamaican Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "JMD",
        namePlural: "Jamaican dollars",
        namePluralNative: "Jamaican dollars"
    },
    JOD: {
        symbol: "JD",
        name: "Jordanian Dinar",
        symbolNative: "د.أ.‏",
        decimalDigit: 3,
        rounding: 0,
        code: "JOD",
        namePlural: "Jordanian dinars",
        namePluralNative: "دينار أردني"
    },
    JPY: {
        symbol: "¥",
        name: "Japanese Yen",
        symbolNative: "￥",
        decimalDigit: 0,
        rounding: 0,
        code: "JPY",
        namePlural: "Japanese yen",
        namePluralNative: "日本円"
    },
    KES: {
        symbol: "Ksh",
        name: "Kenyan Shilling",
        symbolNative: "Ksh",
        decimalDigit: 2,
        rounding: 0,
        code: "KES",
        namePlural: "Kenyan shillings",
        namePluralNative: "shilingi za Kenya"
    },
    KHR: {
        symbol: "KHR",
        name: "Cambodian Riel",
        symbolNative: "៛",
        decimalDigit: 2,
        rounding: 0,
        code: "KHR",
        namePlural: "Cambodian riels",
        namePluralNative: "រៀល"
    },
    KMF: {
        symbol: "CF",
        name: "Comorian Franc",
        symbolNative: "FC",
        decimalDigit: 0,
        rounding: 0,
        code: "KMF",
        namePlural: "Comorian francs",
        namePluralNative: "francs comoriens"
    },
    KRW: {
        symbol: "₩",
        name: "South Korean Won",
        symbolNative: "₩",
        decimalDigit: 0,
        rounding: 0,
        code: "KRW",
        namePlural: "South Korean won",
        namePluralNative: "대한민국 원"
    },
    KWD: {
        symbol: "KD",
        name: "Kuwaiti Dinar",
        symbolNative: "د.ك.‏",
        decimalDigit: 3,
        rounding: 0,
        code: "KWD",
        namePlural: "Kuwaiti dinars",
        namePluralNative: "دينار كويتي"
    },
    KZT: {
        symbol: "KZT",
        name: "Kazakhstani Tenge",
        symbolNative: "тңг.",
        decimalDigit: 2,
        rounding: 0,
        code: "KZT",
        namePlural: "Kazakhstani tenges",
        namePluralNative: "Қазақ теңгесі"
    },
    LBP: {
        symbol: "LBP",
        name: "Lebanese Pound",
        symbolNative: "ل.ل.‏",
        decimalDigit: 0,
        rounding: 0,
        code: "LBP",
        namePlural: "Lebanese pounds",
        namePluralNative: "الليرة اللبنانية"
    },
    LKR: {
        symbol: "SLRs",
        name: "Sri Lankan Rupee",
        symbolNative: "SL Re",
        decimalDigit: 2,
        rounding: 0,
        code: "LKR",
        namePlural: "Sri Lankan rupees",
        namePluralNative: "Sri Lankan rupees"
    },
    LTL: {
        symbol: "Lt",
        name: "Lithuanian Litas",
        symbolNative: "Lt",
        decimalDigit: 2,
        rounding: 0,
        code: "LTL",
        namePlural: "Lithuanian litai",
        namePluralNative: "Lietuvos litai"
    },
    LVL: {
        symbol: "Ls",
        name: "Latvian Lats",
        symbolNative: "Ls",
        decimalDigit: 2,
        rounding: 0,
        code: "LVL",
        namePlural: "Latvian lati",
        namePluralNative: "Latvijas lati"
    },
    LYD: {
        symbol: "LD",
        name: "Libyan Dinar",
        symbolNative: "د.ل.‏",
        decimalDigit: 3,
        rounding: 0,
        code: "LYD",
        namePlural: "Libyan dinars",
        namePluralNative: "دينار ليبي"
    },
    MAD: {
        symbol: "MAD",
        name: "Moroccan Dirham",
        symbolNative: "د.م.‏",
        decimalDigit: 2,
        rounding: 0,
        code: "MAD",
        namePlural: "Moroccan dirhams",
        namePluralNative: "درهم مغربي"
    },
    MDL: {
        symbol: "MDL",
        name: "Moldovan Leu",
        symbolNative: "MDL",
        decimalDigit: 2,
        rounding: 0,
        code: "MDL",
        namePlural: "Moldovan lei",
        namePluralNative: "Moldovan lei"
    },
    MGA: {
        symbol: "MGA",
        name: "Malagasy Ariary",
        symbolNative: "MGA",
        decimalDigit: 0,
        rounding: 0,
        code: "MGA",
        namePlural: "Malagasy ariaries",
        namePluralNative: "Malagasy ariaries"
    },
    MKD: {
        symbol: "MKD",
        name: "Macedonian Denar",
        symbolNative: "MKD",
        decimalDigit: 2,
        rounding: 0,
        code: "MKD",
        namePlural: "Macedonian denari",
        namePluralNative: "Macedonian denari"
    },
    MMK: {
        symbol: "MMK",
        name: "Myanma Kyat",
        symbolNative: "K",
        decimalDigit: 0,
        rounding: 0,
        code: "MMK",
        namePlural: "Myanma kyats",
        namePluralNative: "Myanma kyats"
    },
    MOP: {
        symbol: "MOP$",
        name: "Macanese Pataca",
        symbolNative: "MOP$",
        decimalDigit: 2,
        rounding: 0,
        code: "MOP",
        namePlural: "Macanese patacas",
        namePluralNative: "Macanese patacas"
    },
    MUR: {
        symbol: "MURs",
        name: "Mauritian Rupee",
        symbolNative: "MURs",
        decimalDigit: 0,
        rounding: 0,
        code: "MUR",
        namePlural: "Mauritian rupees",
        namePluralNative: "Mauritian rupees"
    },
    MXN: {
        symbol: "MX$",
        name: "Mexican Peso",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "MXN",
        namePlural: "Mexican pesos",
        namePluralNative: "pesos mexicanos"
    },
    MYR: {
        symbol: "RM",
        name: "Malaysian Ringgit",
        symbolNative: "RM",
        decimalDigit: 2,
        rounding: 0,
        code: "MYR",
        namePlural: "Malaysian ringgits",
        namePluralNative: "Ringgit Malaysia"
    },
    MZN: {
        symbol: "MTn",
        name: "Mozambican Metical",
        symbolNative: "MTn",
        decimalDigit: 2,
        rounding: 0,
        code: "MZN",
        namePlural: "Mozambican meticals",
        namePluralNative: "Meticais"
    },
    NAD: {
        symbol: "N$",
        name: "Namibian Dollar",
        symbolNative: "N$",
        decimalDigit: 2,
        rounding: 0,
        code: "NAD",
        namePlural: "Namibian dollars",
        namePluralNative: "Namibian dollars"
    },
    NGN: {
        symbol: "₦",
        name: "Nigerian Naira",
        symbolNative: "₦",
        decimalDigit: 2,
        rounding: 0,
        code: "NGN",
        namePlural: "Nigerian nairas",
        namePluralNative: "Nigerian nairas"
    },
    NIO: {
        symbol: "C$",
        name: "Nicaraguan Córdoba",
        symbolNative: "C$",
        decimalDigit: 2,
        rounding: 0,
        code: "NIO",
        namePlural: "Nicaraguan córdobas",
        namePluralNative: "córdobas nicaragüenses"
    },
    NOK: {
        symbol: "Nkr",
        name: "Norwegian Krone",
        symbolNative: "kr",
        decimalDigit: 2,
        rounding: 0,
        code: "NOK",
        namePlural: "Norwegian kroner",
        namePluralNative: "norske kroner"
    },
    NPR: {
        symbol: "NPRs",
        name: "Nepalese Rupee",
        symbolNative: "नेरू",
        decimalDigit: 2,
        rounding: 0,
        code: "NPR",
        namePlural: "Nepalese rupees",
        namePluralNative: "नेपाली रूपैयाँ"
    },
    NZD: {
        symbol: "NZ$",
        name: "New Zealand Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "NZD",
        namePlural: "New Zealand dollars",
        namePluralNative: "New Zealand dollars"
    },
    OMR: {
        symbol: "OMR",
        name: "Omani Rial",
        symbolNative: "ر.ع.‏",
        decimalDigit: 3,
        rounding: 0,
        code: "OMR",
        namePlural: "Omani rials",
        namePluralNative: "ريال عماني"
    },
    PAB: {
        symbol: "B/.",
        name: "Panamanian Balboa",
        symbolNative: "B/.",
        decimalDigit: 2,
        rounding: 0,
        code: "PAB",
        namePlural: "Panamanian balboas",
        namePluralNative: "balboas panameños"
    },
    PEN: {
        symbol: "S/.",
        name: "Peruvian Nuevo Sol",
        symbolNative: "S/.",
        decimalDigit: 2,
        rounding: 0,
        code: "PEN",
        namePlural: "Peruvian nuevos soles",
        namePluralNative: "nuevos soles peruanos"
    },
    PHP: {
        symbol: "₱",
        name: "Philippine Peso",
        symbolNative: "₱",
        decimalDigit: 2,
        rounding: 0,
        code: "PHP",
        namePlural: "Philippine pesos",
        namePluralNative: "Piso ng Pilipinas"
    },
    PKR: {
        symbol: "PKRs",
        name: "Pakistani Rupee",
        symbolNative: "₨",
        decimalDigit: 0,
        rounding: 0,
        code: "PKR",
        namePlural: "Pakistani rupees",
        namePluralNative: "Pakistani rupees"
    },
    PLN: {
        symbol: "zł",
        name: "Polish Zloty",
        symbolNative: "zł",
        decimalDigit: 2,
        rounding: 0,
        code: "PLN",
        namePlural: "Polish zlotys",
        namePluralNative: "złote"
    },
    PYG: {
        symbol: "₲",
        name: "Paraguayan Guarani",
        symbolNative: "₲",
        decimalDigit: 0,
        rounding: 0,
        code: "PYG",
        namePlural: "Paraguayan guaranis",
        namePluralNative: "guaraníes"
    },
    QAR: {
        symbol: "QR",
        name: "Qatari Rial",
        symbolNative: "ر.ق.‏",
        decimalDigit: 2,
        rounding: 0,
        code: "QAR",
        namePlural: "Qatari rials",
        namePluralNative: "ريال قطري"
    },
    RON: {
        symbol: "RON",
        name: "Romanian Leu",
        symbolNative: "RON",
        decimalDigit: 2,
        rounding: 0,
        code: "RON",
        namePlural: "Romanian lei",
        namePluralNative: "leu românesc"
    },
    RSD: {
        symbol: "din.",
        name: "Serbian Dinar",
        symbolNative: "дин.",
        decimalDigit: 0,
        rounding: 0,
        code: "RSD",
        namePlural: "Serbian dinars",
        namePluralNative: "Serbian dinars"
    },
    RUB: {
        symbol: "RUB",
        name: "Russian Ruble",
        symbolNative: "руб.",
        decimalDigit: 2,
        rounding: 0,
        code: "RUB",
        namePlural: "Russian rubles",
        namePluralNative: "российские рубли"
    },
    RWF: {
        symbol: "RWF",
        name: "Rwandan Franc",
        symbolNative: "FR",
        decimalDigit: 0,
        rounding: 0,
        code: "RWF",
        namePlural: "Rwandan francs",
        namePluralNative: "RWF"
    },
    SAR: {
        symbol: "SR",
        name: "Saudi Riyal",
        symbolNative: "ر.س.‏",
        decimalDigit: 2,
        rounding: 0,
        code: "SAR",
        namePlural: "Saudi riyals",
        namePluralNative: "ريال سعودي"
    },
    SBD: {
        symbol: "SI$",
        name: "Solomon Islands Dollar",
        symbolNative: "SI$",
        decimalDigit: 2,
        rounding: 0,
        code: "SBD",
        namePlural: "Solomon Islands dollars",
        namePluralNative: "Solomon Islands dollars"
    },
    SCR: {
        symbol: "SRe",
        name: "Seychellois Rupee",
        symbolNative: "SRe",
        decimalDigit: 2,
        rounding: 0,
        code: "SCR",
        namePlural: "Seychellois rupees",
        namePluralNative: "Seychellois rupees"
    },
    SDG: {
        symbol: "SDG",
        name: "Sudanese Pound",
        symbolNative: "SDG",
        decimalDigit: 2,
        rounding: 0,
        code: "SDG",
        namePlural: "Sudanese pounds",
        namePluralNative: "جنيه سوداني"
    },
    SEK: {
        symbol: "Skr",
        name: "Swedish Krona",
        symbolNative: "kr",
        decimalDigit: 2,
        rounding: 0,
        code: "SEK",
        namePlural: "Swedish kronor",
        namePluralNative: "svenska kronor"
    },
    SGD: {
        symbol: "S$",
        name: "Singapore Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "SGD",
        namePlural: "Singapore dollars",
        namePluralNative: "Singapore dollars"
    },
    SOS: {
        symbol: "Ssh",
        name: "Somali Shilling",
        symbolNative: "Ssh",
        decimalDigit: 0,
        rounding: 0,
        code: "SOS",
        namePlural: "Somali shillings",
        namePluralNative: "shilin soomaali"
    },
    SYP: {
        symbol: "SY£",
        name: "Syrian Pound",
        symbolNative: "ل.س.‏",
        decimalDigit: 0,
        rounding: 0,
        code: "SYP",
        namePlural: "Syrian pounds",
        namePluralNative: "الليرة السورية"
    },
    THB: {
        symbol: "฿",
        name: "Thai Baht",
        symbolNative: "฿",
        decimalDigit: 2,
        rounding: 0,
        code: "THB",
        namePlural: "Thai baht",
        namePluralNative: "บาทไทย"
    },
    TND: {
        symbol: "DT",
        name: "Tunisian Dinar",
        symbolNative: "د.ت.‏",
        decimalDigit: 3,
        rounding: 0,
        code: "TND",
        namePlural: "Tunisian dinars",
        namePluralNative: "دينار تونسي"
    },
    TOP: {
        symbol: "T$",
        name: "Tongan Paʻanga",
        symbolNative: "T$",
        decimalDigit: 2,
        rounding: 0,
        code: "TOP",
        namePlural: "Tongan paʻanga",
        namePluralNative: "Tongan paʻanga"
    },
    TRY: {
        symbol: "TL",
        name: "Turkish Lira",
        symbolNative: "TL",
        decimalDigit: 2,
        rounding: 0,
        code: "TRY",
        namePlural: "Turkish Lira",
        namePluralNative: "Turkish Lira"
    },
    TTD: {
        symbol: "TT$",
        name: "Trinidad and Tobago Dollar",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "TTD",
        namePlural: "Trinidad and Tobago dollars",
        namePluralNative: "Trinidad and Tobago dollars"
    },
    TWD: {
        symbol: "NT$",
        name: "New Taiwan Dollar",
        symbolNative: "NT$",
        decimalDigit: 2,
        rounding: 0,
        code: "TWD",
        namePlural: "New Taiwan dollars",
        namePluralNative: "新臺幣"
    },
    TZS: {
        symbol: "TSh",
        name: "Tanzanian Shilling",
        symbolNative: "TSh",
        decimalDigit: 0,
        rounding: 0,
        code: "TZS",
        namePlural: "Tanzanian shillings",
        namePluralNative: "Tanzanian shillings"
    },
    UAH: {
        symbol: "₴",
        name: "Ukrainian Hryvnia",
        symbolNative: "₴",
        decimalDigit: 2,
        rounding: 0,
        code: "UAH",
        namePlural: "Ukrainian hryvnias",
        namePluralNative: "українські гривні"
    },
    UGX: {
        symbol: "USh",
        name: "Ugandan Shilling",
        symbolNative: "USh",
        decimalDigit: 0,
        rounding: 0,
        code: "UGX",
        namePlural: "Ugandan shillings",
        namePluralNative: "Ugandan shillings"
    },
    UYU: {
        symbol: "$U",
        name: "Uruguayan Peso",
        symbolNative: "$",
        decimalDigit: 2,
        rounding: 0,
        code: "UYU",
        namePlural: "Uruguayan pesos",
        namePluralNative: "pesos uruguayos"
    },
    UZS: {
        symbol: "UZS",
        name: "Uzbekistan Som",
        symbolNative: "UZS",
        decimalDigit: 0,
        rounding: 0,
        code: "UZS",
        namePlural: "Uzbekistan som",
        namePluralNative: "Uzbekistan som"
    },
    VEF: {
        symbol: "Bs.F.",
        name: "Venezuelan Bolívar",
        symbolNative: "Bs.F.",
        decimalDigit: 2,
        rounding: 0,
        code: "VEF",
        namePlural: "Venezuelan bolívars",
        namePluralNative: "bolívares venezolanos"
    },
    VND: {
        symbol: "₫",
        name: "Vietnamese Dong",
        symbolNative: "₫",
        decimalDigit: 0,
        rounding: 0,
        code: "VND",
        namePlural: "Vietnamese dong",
        namePluralNative: "đồng Việt Nam"
    },
    XAF: {
        symbol: "FCFA",
        name: "CFA Franc BEAC",
        symbolNative: "FCFA",
        decimalDigit: 0,
        rounding: 0,
        code: "XAF",
        namePlural: "CFA francs BEAC",
        namePluralNative: "francs CFA BEAC"
    },
    XOF: {
        symbol: "CFA",
        name: "CFA Franc BCEAO",
        symbolNative: "CFA",
        decimalDigit: 0,
        rounding: 0,
        code: "XOF",
        namePlural: "CFA francs BCEAO",
        namePluralNative: "francs CFA BCEAO"
    },
    YER: {
        symbol: "YR",
        name: "Yemeni Rial",
        symbolNative: "ر.ي.‏",
        decimalDigit: 0,
        rounding: 0,
        code: "YER",
        namePlural: "Yemeni rials",
        namePluralNative: "ريال يمني"
    },
    ZAR: {
        symbol: "R",
        name: "South African Rand",
        symbolNative: "R",
        decimalDigit: 2,
        rounding: 0,
        code: "ZAR",
        namePlural: "South African rand",
        namePluralNative: "South African rand"
    },
    ZMK: {
        symbol: "ZK",
        name: "Zambian Kwacha",
        symbolNative: "ZK",
        decimalDigit: 0,
        rounding: 0,
        code: "ZMK",
        namePlural: "Zambian kwachas",
        namePluralNative: "Zambian kwachas"
    },
    ZWL: {
        symbol: "ZWL$",
        name: "Zimbabwean Dollar",
        symbolNative: "ZWL$",
        decimalDigit: 0,
        rounding: 0,
        code: "ZWL",
        namePlural: "Zimbabwean Dollar",
        namePluralNative: "Zimbabwean Dollar"
    }
};

export type CurrencyCode = keyof typeof CurrencyMap;

const Currencies: Record<CurrencyCode, Currency> = CurrencyMap;

export { CurrencyMap, Currencies };
