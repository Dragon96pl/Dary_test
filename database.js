const productsData = [
  {
    "id": 0,
    "name": "Krem pod oczy",
    "link": "https://jozka.pl/produkt/krem-pod-oczy/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Kobieta",
      "rodzajSkory": "Wrażliwa",
      "problemSkory": "Przeciwzmarszczkowy"
    },
    "ingredients": "Aqua, Vitis Vinifera Seed Oil, Butyrospermum Parkii Butter, Cetearyl Olivate, Glicerin, Sorbitan Olivate, Squalane, Propanediol, Stearic Acid, Tocopheryl Acetate, Cetyl Alcohol, Coffea Arabica Seed Extract, Althaea Officinalis Root Extract, Camellia Sinensis Leaf Extract, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Phytic Acid, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid, Sodium Benzoate, Potassium Sorbate, Sodium Hydroxide."
  },
  {
    "id": 1,
    "name": "Krem pod oczy",
    "link": "https://jozka.pl/produkt/krem-pod-oczy/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Kobieta",
      "rodzajSkory": "Sucha",
      "problemSkory": "Przeciwzmarszczkowy"
    },
    "ingredients": "Aqua, Vitis Vinifera Seed Oil, Butyrospermum Parkii Butter, Cetearyl Olivate, Glicerin, Sorbitan Olivate, Squalane, Propanediol, Stearic Acid, Tocopheryl Acetate, Cetyl Alcohol, Coffea Arabica Seed Extract, Althaea Officinalis Root Extract, Camellia Sinensis Leaf Extract, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Phytic Acid, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid, Sodium Benzoate, Potassium Sorbate, Sodium Hydroxide."
  },
  {
    "id": 2,
    "name": "Krem pod oczy",
    "link": "https://jozka.pl/produkt/krem-pod-oczy/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Kobieta",
      "rodzajSkory": "Mieszana",
      "problemSkory": "Przeciwzmarszczkowy"
    },
    "ingredients": "Aqua, Vitis Vinifera Seed Oil, Butyrospermum Parkii Butter, Cetearyl Olivate, Glicerin, Sorbitan Olivate, Squalane, Propanediol, Stearic Acid, Tocopheryl Acetate, Cetyl Alcohol, Coffea Arabica Seed Extract, Althaea Officinalis Root Extract, Camellia Sinensis Leaf Extract, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Phytic Acid, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid, Sodium Benzoate, Potassium Sorbate, Sodium Hydroxide."
  },
  {
    "id": 3,
    "name": "Krem pod oczy",
    "link": "https://jozka.pl/produkt/krem-pod-oczy/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Kobieta",
      "rodzajSkory": "Dojrzała",
      "problemSkory": "Przeciwzmarszczkowy"
    },
    "ingredients": "Aqua, Vitis Vinifera Seed Oil, Butyrospermum Parkii Butter, Cetearyl Olivate, Glicerin, Sorbitan Olivate, Squalane, Propanediol, Stearic Acid, Tocopheryl Acetate, Cetyl Alcohol, Coffea Arabica Seed Extract, Althaea Officinalis Root Extract, Camellia Sinensis Leaf Extract, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Phytic Acid, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid, Sodium Benzoate, Potassium Sorbate, Sodium Hydroxide."
  },
  {
    "id": 4,
    "name": "Krem pod oczy",
    "link": "https://jozka.pl/produkt/krem-pod-oczy/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Kobieta",
      "rodzajSkory": "Naczynkowa",
      "problemSkory": "Przeciwzmarszczkowy"
    },
    "ingredients": "Aqua, Vitis Vinifera Seed Oil, Butyrospermum Parkii Butter, Cetearyl Olivate, Glicerin, Sorbitan Olivate, Squalane, Propanediol, Stearic Acid, Tocopheryl Acetate, Cetyl Alcohol, Coffea Arabica Seed Extract, Althaea Officinalis Root Extract, Camellia Sinensis Leaf Extract, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Phytic Acid, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid, Sodium Benzoate, Potassium Sorbate, Sodium Hydroxide."
  },
  {
    "id": 5,
    "name": "Krem pod oczy",
    "link": "https://jozka.pl/produkt/krem-pod-oczy/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Mężczyzna",
      "rodzajSkory": "Wrażliwa",
      "problemSkory": "Przeciwzmarszczkowy"
    },
    "ingredients": "Aqua, Vitis Vinifera Seed Oil, Butyrospermum Parkii Butter, Cetearyl Olivate, Glicerin, Sorbitan Olivate, Squalane, Propanediol, Stearic Acid, Tocopheryl Acetate, Cetyl Alcohol, Coffea Arabica Seed Extract, Althaea Officinalis Root Extract, Camellia Sinensis Leaf Extract, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Phytic Acid, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid, Sodium Benzoate, Potassium Sorbate, Sodium Hydroxide."
  },
  {
    "id": 6,
    "name": "Krem pod oczy",
    "link": "https://jozka.pl/produkt/krem-pod-oczy/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Mężczyzna",
      "rodzajSkory": "Sucha",
      "problemSkory": "Przeciwzmarszczkowy"
    },
    "ingredients": "Aqua, Vitis Vinifera Seed Oil, Butyrospermum Parkii Butter, Cetearyl Olivate, Glicerin, Sorbitan Olivate, Squalane, Propanediol, Stearic Acid, Tocopheryl Acetate, Cetyl Alcohol, Coffea Arabica Seed Extract, Althaea Officinalis Root Extract, Camellia Sinensis Leaf Extract, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Phytic Acid, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid, Sodium Benzoate, Potassium Sorbate, Sodium Hydroxide."
  },
  {
    "id": 7,
    "name": "Krem pod oczy",
    "link": "https://jozka.pl/produkt/krem-pod-oczy/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Mężczyzna",
      "rodzajSkory": "Mieszana",
      "problemSkory": "Przeciwzmarszczkowy"
    },
    "ingredients": "Aqua, Vitis Vinifera Seed Oil, Butyrospermum Parkii Butter, Cetearyl Olivate, Glicerin, Sorbitan Olivate, Squalane, Propanediol, Stearic Acid, Tocopheryl Acetate, Cetyl Alcohol, Coffea Arabica Seed Extract, Althaea Officinalis Root Extract, Camellia Sinensis Leaf Extract, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Phytic Acid, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid, Sodium Benzoate, Potassium Sorbate, Sodium Hydroxide."
  },
  {
    "id": 8,
    "name": "Krem pod oczy",
    "link": "https://jozka.pl/produkt/krem-pod-oczy/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Mężczyzna",
      "rodzajSkory": "Dojrzała",
      "problemSkory": "Przeciwzmarszczkowy"
    },
    "ingredients": "Aqua, Vitis Vinifera Seed Oil, Butyrospermum Parkii Butter, Cetearyl Olivate, Glicerin, Sorbitan Olivate, Squalane, Propanediol, Stearic Acid, Tocopheryl Acetate, Cetyl Alcohol, Coffea Arabica Seed Extract, Althaea Officinalis Root Extract, Camellia Sinensis Leaf Extract, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Phytic Acid, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid, Sodium Benzoate, Potassium Sorbate, Sodium Hydroxide."
  },
  {
    "id": 9,
    "name": "Serum normalizujące",
    "link": "https://jozka.pl/produkt/serum-normalizujace/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Kobieta",
      "rodzajSkory": "Mieszana",
      "problemSkory": "Regulacja-sebium"
    },
    "ingredients": "Aqua, Propanediol, Glicerin, Niacinamide, Squalane, Potassium Azeloyl Diglycinate, Prunus Domestica Seed Oil, Avena Sativa Kernel Flour, Avena Sativa Kernel Extract, Phytic Acid, Tocopheryl Acetate, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Lactic Acid, Xanthan Gum, PEG-40 Hydrogenated Castor Oil, Benzyl Alcohol, Dehydroacetic Acid, Sodium Benzoate, Potassium Sorbate, Parfum."
  },
  {
    "id": 10,
    "name": "Serum normalizujące",
    "link": "https://jozka.pl/produkt/serum-normalizujace/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Kobieta",
      "rodzajSkory": "Tłusta",
      "problemSkory": "Regulacja-sebium"
    },
    "ingredients": "Aqua, Propanediol, Glicerin, Niacinamide, Squalane, Potassium Azeloyl Diglycinate, Prunus Domestica Seed Oil, Avena Sativa Kernel Flour, Avena Sativa Kernel Extract, Phytic Acid, Tocopheryl Acetate, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Lactic Acid, Xanthan Gum, PEG-40 Hydrogenated Castor Oil, Benzyl Alcohol, Dehydroacetic Acid, Sodium Benzoate, Potassium Sorbate, Parfum."
  },
  {
    "id": 11,
    "name": "Serum normalizujące",
    "link": "https://jozka.pl/produkt/serum-normalizujace/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Mężczyzna",
      "rodzajSkory": "Mieszana",
      "problemSkory": "Regulacja-sebium"
    },
    "ingredients": "Aqua, Propanediol, Glicerin, Niacinamide, Squalane, Potassium Azeloyl Diglycinate, Prunus Domestica Seed Oil, Avena Sativa Kernel Flour, Avena Sativa Kernel Extract, Phytic Acid, Tocopheryl Acetate, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Lactic Acid, Xanthan Gum, PEG-40 Hydrogenated Castor Oil, Benzyl Alcohol, Dehydroacetic Acid, Sodium Benzoate, Potassium Sorbate, Parfum."
  },
  {
    "id": 12,
    "name": "Serum normalizujące",
    "link": "https://jozka.pl/produkt/serum-normalizujace/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Mężczyzna",
      "rodzajSkory": "Tłusta",
      "problemSkory": "Regulacja-sebium"
    },
    "ingredients": "Aqua, Propanediol, Glicerin, Niacinamide, Squalane, Potassium Azeloyl Diglycinate, Prunus Domestica Seed Oil, Avena Sativa Kernel Flour, Avena Sativa Kernel Extract, Phytic Acid, Tocopheryl Acetate, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Lactic Acid, Xanthan Gum, PEG-40 Hydrogenated Castor Oil, Benzyl Alcohol, Dehydroacetic Acid, Sodium Benzoate, Potassium Sorbate, Parfum."
  },
  {
    "id": 13,
    "name": "Krem do twarzy",
    "link": "https://jozka.pl/produkt/krem-do-twarzy/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Kobieta",
      "rodzajSkory": "Wrażliwa",
      "problemSkory": "Nawilżenie"
    },
    "ingredients": "Aqua, Caprylic/Capric Triglyceride, Propanediol, Vitis Vinifera Seed Oil, Cetearyl Olivate, Sorbitan Olivate, Butyrospermum Parkii Butter, Glicerin, Squalane, Cetyl Alcohol, Linum Usitatissimum Seed Oil, Tocopheryl Acetate, Avena Sativa Kernel Flour, Phytic Acid, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Lactic Acid, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid, Parfum."
  },
  {
    "id": 14,
    "name": "Krem do twarzy",
    "link": "https://jozka.pl/produkt/krem-do-twarzy/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Kobieta",
      "rodzajSkory": "Sucha",
      "problemSkory": "Nawilżenie"
    },
    "ingredients": "Aqua, Caprylic/Capric Triglyceride, Propanediol, Vitis Vinifera Seed Oil, Cetearyl Olivate, Sorbitan Olivate, Butyrospermum Parkii Butter, Glicerin, Squalane, Cetyl Alcohol, Linum Usitatissimum Seed Oil, Tocopheryl Acetate, Avena Sativa Kernel Flour, Phytic Acid, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Lactic Acid, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid, Parfum."
  },
  {
    "id": 15,
    "name": "Krem do twarzy",
    "link": "https://jozka.pl/produkt/krem-do-twarzy/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Kobieta",
      "rodzajSkory": "Mieszana",
      "problemSkory": "Nawilżenie"
    },
    "ingredients": "Aqua, Caprylic/Capric Triglyceride, Propanediol, Vitis Vinifera Seed Oil, Cetearyl Olivate, Sorbitan Olivate, Butyrospermum Parkii Butter, Glicerin, Squalane, Cetyl Alcohol, Linum Usitatissimum Seed Oil, Tocopheryl Acetate, Avena Sativa Kernel Flour, Phytic Acid, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Lactic Acid, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid, Parfum."
  },
  {
    "id": 16,
    "name": "Krem do twarzy",
    "link": "https://jozka.pl/produkt/krem-do-twarzy/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Mężczyzna",
      "rodzajSkory": "Wrażliwa",
      "problemSkory": "Nawilżenie"
    },
    "ingredients": "Aqua, Caprylic/Capric Triglyceride, Propanediol, Vitis Vinifera Seed Oil, Cetearyl Olivate, Sorbitan Olivate, Butyrospermum Parkii Butter, Glicerin, Squalane, Cetyl Alcohol, Linum Usitatissimum Seed Oil, Tocopheryl Acetate, Avena Sativa Kernel Flour, Phytic Acid, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Lactic Acid, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid, Parfum."
  },
  {
    "id": 17,
    "name": "Krem do twarzy",
    "link": "https://jozka.pl/produkt/krem-do-twarzy/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Mężczyzna",
      "rodzajSkory": "Sucha",
      "problemSkory": "Nawilżenie"
    },
    "ingredients": "Aqua, Caprylic/Capric Triglyceride, Propanediol, Vitis Vinifera Seed Oil, Cetearyl Olivate, Sorbitan Olivate, Butyrospermum Parkii Butter, Glicerin, Squalane, Cetyl Alcohol, Linum Usitatissimum Seed Oil, Tocopheryl Acetate, Avena Sativa Kernel Flour, Phytic Acid, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Lactic Acid, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid, Parfum."
  },
  {
    "id": 18,
    "name": "Krem do twarzy",
    "link": "https://jozka.pl/produkt/krem-do-twarzy/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Mężczyzna",
      "rodzajSkory": "Mieszana",
      "problemSkory": "Nawilżenie"
    },
    "ingredients": "Aqua, Caprylic/Capric Triglyceride, Propanediol, Vitis Vinifera Seed Oil, Cetearyl Olivate, Sorbitan Olivate, Butyrospermum Parkii Butter, Glicerin, Squalane, Cetyl Alcohol, Linum Usitatissimum Seed Oil, Tocopheryl Acetate, Avena Sativa Kernel Flour, Phytic Acid, Hydrolyzed Sodium Hyaluronate, Sodium Hyaluronate, Lactic Acid, Xanthan Gum, Benzyl Alcohol, Dehydroacetic Acid, Parfum."
  },
  {
    "id": 19,
    "name": "Szampon do włosów",
    "link": "https://jozka.pl/produkt/szampon-do-wlosow-w-kostce/",
    "criteria": {
      "grupaWiekowa": "Uniwersalne",
      "plec": "Uniwersalne",
      "rodzajSkory": "",
      "problemSkory": ""
    },
    "ingredients": "Sodium Cocoyl Isethionate, Sodium Coco-Sulfate, Cetyl Alcohol, Butyrospermum Parkii Butter, Theobroma Cacao Seed Butter, Stearic Acid, Vitis Vinifera Seed Oil, Illite, Urtica Dioica Leaf, Glycerin, Hydrolyzed Wheat Protein, Inulin, Panthenol, Tocopheryl Acetate, Lactic Acid, Benzyl Alcohol, Dehydroacetic Acid, Parfum."
  },
  {
    "id": 20,
    "name": "Szampon do włosów",
    "link": "https://jozka.pl/produkt/szampon-do-wlosow-w-kostce/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Uniwersalne",
      "rodzajSkory": "",
      "problemSkory": ""
    },
    "ingredients": "Sodium Cocoyl Isethionate, Sodium Coco-Sulfate, Cetyl Alcohol, Butyrospermum Parkii Butter, Theobroma Cacao Seed Butter, Stearic Acid, Vitis Vinifera Seed Oil, Illite, Urtica Dioica Leaf, Glycerin, Hydrolyzed Wheat Protein, Inulin, Panthenol, Tocopheryl Acetate, Lactic Acid, Benzyl Alcohol, Dehydroacetic Acid, Parfum."
  },
  {
    "id": 21,
    "name": "Szampon do włosów",
    "link": "https://jozka.pl/produkt/szampon-do-wlosow-w-kostce/",
    "criteria": {
      "grupaWiekowa": "Dziecko",
      "plec": "Uniwersalne",
      "rodzajSkory": "",
      "problemSkory": ""
    },
    "ingredients": "Sodium Cocoyl Isethionate, Sodium Coco-Sulfate, Cetyl Alcohol, Butyrospermum Parkii Butter, Theobroma Cacao Seed Butter, Stearic Acid, Vitis Vinifera Seed Oil, Illite, Urtica Dioica Leaf, Glycerin, Hydrolyzed Wheat Protein, Inulin, Panthenol, Tocopheryl Acetate, Lactic Acid, Benzyl Alcohol, Dehydroacetic Acid, Parfum."
  },
  {
    "id": 22,
    "name": "Mydło do ciała",
    "link": "https://jozka.pl/produkt/mydlo-do-ciala-w-kostce/",
    "criteria": {
      "grupaWiekowa": "Uniwersalne",
      "plec": "Uniwersalne",
      "rodzajSkory": "",
      "problemSkory": ""
    },
    "ingredients": "Sodium Cocoyl Isethionate, Sodium Coco-Sulfate, Butyrospermum Parkii Butter, Cetyl Alcohol, Stearic Acid, Theobroma Cacao Seed Butter, Prunus Amygdalus Dulcis Oil, Avena Sativa Kernel Flour, Inulin, Panthenol, Glycerin, Tocopheryl Acetate, Benzyl Alcohol, Dehydroacetic Acid, Parfum."
  },
  {
    "id": 23,
    "name": "Mydło do ciała",
    "link": "https://jozka.pl/produkt/mydlo-do-ciala-w-kostce/",
    "criteria": {
      "grupaWiekowa": "Dorosły",
      "plec": "Uniwersalne",
      "rodzajSkory": "",
      "problemSkory": ""
    },
    "ingredients": "Sodium Cocoyl Isethionate, Sodium Coco-Sulfate, Butyrospermum Parkii Butter, Cetyl Alcohol, Stearic Acid, Theobroma Cacao Seed Butter, Prunus Amygdalus Dulcis Oil, Avena Sativa Kernel Flour, Inulin, Panthenol, Glycerin, Tocopheryl Acetate, Benzyl Alcohol, Dehydroacetic Acid, Parfum."
  },
  {
    "id": 24,
    "name": "Mydło do ciała",
    "link": "https://jozka.pl/produkt/mydlo-do-ciala-w-kostce/",
    "criteria": {
      "grupaWiekowa": "Dziecko",
      "plec": "Uniwersalne",
      "rodzajSkory": "",
      "problemSkory": ""
    },
    "ingredients": "Sodium Cocoyl Isethionate, Sodium Coco-Sulfate, Butyrospermum Parkii Butter, Cetyl Alcohol, Stearic Acid, Theobroma Cacao Seed Butter, Prunus Amygdalus Dulcis Oil, Avena Sativa Kernel Flour, Inulin, Panthenol, Glycerin, Tocopheryl Acetate, Benzyl Alcohol, Dehydroacetic Acid, Parfum."
  }
];
