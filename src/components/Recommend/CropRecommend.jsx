import React ,{useState,useEffect} from 'react'
import axios from 'axios';
import Navbar from '../Navbar/Navbar'
import Footer from '../footer/Footer'


const State = ["Andaman & Nicobar", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra & Nagar Haveli", "Daman & Diu", "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jammu & Kashmir", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Orissa", "Pondicherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Tripura", "Uttar Pradesh", "Uttaranchal", "West Bengal"];
const citiesbyState={
    "Andaman & Nicobar": ["Alipur", "Andaman Island"," Anderson Island "," Arainj-Laka-Punga", "Austinabad","Bamboo Flat" , "Barren Island", "donabad", "Betapur", "Bindraban" ,"Bonington","Brookesabad" ,"Cadell Point" ,"Calicut" ,"Chetamale" ,"Cinque Islands" ,"Defence Island" ,"Digilpur" ,"Dolyganj" ,"Flat Island" ,"Geinyale" ,"Great Coco Island" ,"Haddo" ,"Havelock Island" ,"Henry Lawrence Island" ,"Herbertabad" ,"Hobdaypur" ,"Ilichar" ,"Ingoie" ,"Inteview Island" ,"Jangli Ghat" ,"Jhon Lawrence Island" ,"Karen" ,"Kartara" ,"KYD Islannd" ,"Landfall" ,"Little Andmand" ,"Little Coco Island" ,"Long Island" ,"Maimyo" ,"Malappuram" ,"Manglutan" ,"Manpur" ,"Mitha Khari" ,"Neill Island" ,"Nicobar Island" ,"North Brother Island" ,"North Passage Island" ,"North Sentinel Island" ,"Nothen Reef Island" ,"Outram Island" ,"Pahlagaon" ,"Palalankwe" ,"Passage Island" ,"Phaiapong" ,"Phoenix Island" ,"Port Blair" ,"Preparis Island" ,"Protheroepur" ,"Rangachang" ,"Rongat" ,"Rutland Island" ,"Sabari" ,"Saddle Peak" ,"Shadipur" ,"Smith Island" ,"Sound Island" ,"South Sentinel Island" ,"Spike Island" ,"Tarmugli Island" ,"Taylerabad" ,"Titaije " ,"Toibalawe " ,"Tusonabad" ,"West Island" ,"Wimberleyganj " ,"Yadita"],
    "Andhra Pradesh": ["Alampur","Allagadda","Alur","Amalapuram","Amangallu"," Anakapalle","Anantapur"," Andole","Araku","Armoor","Asifabad","Aswaraopet","Atmakur","B. Kothakota","Badvel","Banaganapalle","Bandar","Bangarupalem","Banswada","Bapatla","Bellampalli","Bhadrachalam","Bhainsa","Bheemunipatnam","Bhimadole","Bhimavaram","Bhongir","Bhooragamphad","Chandoor"," Chavitidibbalu","Chejerla","Chepurupalli","Cherial","Chevella","Chinnor","Chintalapudi","Chintapall","Chirala","Chittoor","Chodavaram ","Cuddapah","Cumbum ","Darsi","Devarakonda","Dharmavaram","Dichpalli","Divi","Donakonda","Dronachalam","East Godavari","Eluru","Eturnagaram","Gadwal","Hyderabad"], 
    "Arunachal Pradesh": ["Anini","Bomdila","Changlang","Daporijo","Hayuliang","Itanagar","Jairampur","Khonsa","Miao","Naharlagun","Pasighat","Roing","Seppa","Tawang","Tezu","Ziro"],
    "Assam": ["Abhayapuri","Baithalangshu","Barama","Barpeta Road","Bihupuria","Bijni","Bilasipara","Bokajan","Bokakhat","Boko","Bongaigaon","Cachar","Cachar Hills","Darrang","Dhakuakhana","Dhemaji","Dhubri","Dibrugarh","Digboi","Diphu","Goalpara","Gohpur","Golaghat","Guwahati","Hailakandi","Hajo","Halflong","Hojai","Howraghat","Jorhat","Kamrup","Karimganj","Kokrajhar","Lakhimpur","Mangaldoi","Mariani","Marigaon","Nagaon","Nalbari","North Cachar Hills","Rangapara","Sibsagar","Silchar","Sivasagar","Sonitpur","Tezpur","Tinsukia","Udalguri"],
    "Bihar": ["Adhaura", "Amarpur", "Araria", "Areraj", "Arrah", "Arwal", "Aurangabad", "Bagaha", "Banka", "Banmankhi", "Barachakia", "Barauni", "Barh", "Barosi", "Begusarai", "Benipatti", "Benipur", "Bettiah", "Bhabhua", "Bhagalpur", "Bhojpur", "Bidupur", "Biharsharif", "Bikram", "Bikramganj", "Birpur", "Buxar", "Chakai", "Champaran", "Chapara", "Dalsinghsarai", "Danapur", "Darbhanga", "Daudnagar", "Dhaka", "Dhamdaha", "Dumraon", "Ekma", "Forbesganj", "Gaya", "Gogri", "Gopalganj", "H.Kharagpur", "Hajipur", "Hathua", "Hilsa", "Imamganj", "Jahanabad", "Jainagar", "Jamshedpur", "Jamui", "Jehanabad", "Jhajha", "Jhanjharpur", "Kahalgaon", "Kaimur (Bhabua)", "Katihar", "Katoria", "Khagaria", "Kishanganj", "Korha", "Lakhisarai", "Madhepura", "Madhubani", "Maharajganj", "Mahua", "Mairwa", "Mallehpur", "Masrakh", "Mohania", "Monghyr", "Motihari", "Motipur", "Munger", "Muzaffarpur", "Nabinagar", "Nalanda", "Narkatiaganj", "Naugachia", "Nawada", "Pakribarwan", "Pakridayal", "Patna", "Phulparas", "Piro", "Pupri", "Purena", "Purnia", "Rafiganj", "Rajauli", "Ramnagar", "Raniganj", "Raxaul", "Rohtas", "Rosera", "S.Bakhtiarpur", "Saharsa", "Samastipur", "Saran", "Sasaram", "Seikhpura", "Sheikhpura", "Sheohar", "Sherghati", "Sidhpur", "Singhwara", "Sitamarhi", "Siwan", "Sonepur", "Supaul", "Thakurganj", "Triveniganj", "Udakishanganj", "Vaishali", "Wazirganj"],
    "Chandigarh": ["Chandigarh","Mani Marja"],
    "Chhattisgarh": ["Ambikapur","Baikunthpur","Bemetara","Bhilai","Bijapur","Bilaspur","Dantewada","Dhamtari","Durg","Jagdalpur","Janjgir","Jashpur","Kanker","Kawardha","Korba","Mahasamund","Raigarh","Raipur","Rajnandgaon","Surguja"],
    "Dadra & Nagar Haveli": ["Amal", "Amli", "Bedpa", "Chikhli", "Dadra & Nagar Haveli", "Dahikhed", "Dolara", "Galonda", "Kanadi", "Karchond", "Khadoli", "Kharadpada", "Kherabari", "Kherdi", "Kothar", "Luari", "Mashat", "Rakholi", "Rudana", "Saili", "Sili", "Silvassa", "Sindavni", "Udva", "Umbarkoi", "Vansda", "Vasona", "Velugam"],
    "Daman & Diu": ["Brancavare", "Dagasi", "Daman", "Diu", "Magarvara", "Nagwa", "Pariali", "Passo Covo"],
    "Delhi": ["Central Delhi", "East Delhi", "New Delhi", "North Delhi", "North East Delhi", "North West Delhi", "South Delhi", "South West Delhi", "West Delhi"],
    "Goa": ["Amona", "Bicholim", "Canacona", "Candolim", "Chinchinim", "Cortalim", "Goa", "Jua", "Madgaon", "Mapusa", "Margao", "Marmagao", "Panaji", "Ponda", "Sanvordem", "Terekhol"],
    "Gujarat": ["Ahmedabad", "Ahwa", "Amod", "Amreli", "Anand", "Anjar", "Ankaleshwar", "Babra", "Balasinor", "Banaskantha", "Bansada", "Bardoli", "Bareja", "Baroda", "Barwala", "Bayad", "Bhachav", "Bhanvad", "Bharuch", "Bhavnagar", "Bhildi", "Bhuj", "Billimora", "Borsad", "Botad", "Chanasma", "Chhota Udaipur", "Chotila", "Dabhoi", "Dahod", "Damnagar", "Dang", "Danta", "Dasada", "Dediapada", "Deesa", "Dehgam", "Deodar", "Devgadhbaria", "Dhandhuka", "Dhanera", "Dharampur", "Dharpur", "Dhola", "Dholka", "Dhoraji", "Dhrangadhra", "Dhrol", "Dwarka", "Fortsongadh", "Gadhada", "Gandhi Nagar", "Gariadhar", "Godhra", "Gogodar", "Gondal", "Halol", "Halvad", "Harij", "Himatnagar", "Idar", "Jambusar", "Jamjodhpur", "Jamkalyanpur", "Jamnagar", "Jasdan", "Jetpur", "Jhagadia", "Jhalod", "Jodia", "Junagadh", "Junagarh", "Kalawad", "Kalol", "Kapad Wanj", "Keshod", "Khambat", "Khambhalia", "Khavda", "Kheda", "Khedbrahma", "Kheralu", "Kodinar", "Kotdasanghani", "Kunkawav", "Kutch", "Kutchmandvi", "Kutiyana", "Lakhpat", "Lakhtar", "Lalpur", "Limbdi", "Limkheda", "Lunavada", "M.M.Mangrol", "Mahuva", "Malia-Hatina", "Maliya", "Malpur", "Manavadar", "Mandvi", "Mangrol", "Mehmedabad", "Mehsana", "Miyagam", "Modasa", "Morvi", "Muli", "Mundra", "Nadiad", "Nakhatrana", "Nalia", "Narmada", "Naswadi", "Navasari", "Nizar", "Okha", "Paddhari", "Padra", "Palanpur", "Palitana", "Panchmahals", "Patan", "Pavijetpur", "Porbandar", "Prantij", "Radhanpur", "Rahpar", "Rajaula", "Rajkot", "Rajpipla", "Ranavav", "Sabarkantha", "Sanand", "Sankheda", "Santalpur", "Santrampur", "Savarkundla", "Savli", "Sayan", "Sayla", "Shehra", "Sidhpur", "Sihor", "Sojitra", "Sumrasar", "Surat", "Surendranagar", "Talaja", "Thara", "Tharad", "Thasra", "Una-Diu", "Upleta", "Vadgam", "Vadodara", "Valia", "Vallabhipur", "Valod", "Valsad", "Vanthali", "Vapi", "Vav", "Veraval", "Vijapur", "Viramgam", "Visavadar", "Visnagar", "Vyara", "Waghodia", "Wankaner"],
    "Haryana": ["Ambala", "Assandh", "Bahadurgarh", "Bhiwani", "Charkhi Dadri", "Dabwali", "Ellenabad", "Faridabad", "Fatehabad", "Gohana", "Gurgaon", "Hansi", "Hisar", "Jagadhri", "Jhajjar", "Jind", "Kaithal", "Kalka", "Karnal", "Kurukshetra", "Mahendragarh", "Mewat", "Narnaul", "Narwana", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonepat", "Tohana", "Yamunanagar"],
    "Himachal Pradesh": ["Bilaspur", "Chamba", "Dalhousie", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahul & Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
    "Jammu & Kashmir": ["Akhnoor", "Anantnag", "Badgam", "Bandipur", "Baramulla", "Basholi", "Bedarwah", "Budgam", "Doda", "Gulmarg", "Jammu", "Kalakot", "Kargil", "Karnah", "Kathua", "Kishtwar", "Kulgam", "Kupwara", "Leh", "Mahore", "Nagrota", "Nobra", "Nowshera", "Nyoma", "Padam", "Pahalgam", "Patnitop", "Poonch", "Pulwama", "Rajouri", "Ramban", "Ramnagar", "Reasi", "Samba", "Srinagar", "Udhampur", "Vaishno Devi"],
    "Jharkhand": ["Bokaro", "Chaibasa", "Chatra", "Deoghar", "Dhanbad", "Dumka", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamshedpur", "Jamtara", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Rajmahal", "Ranchi", "Sahibganj", "Seraikela", "Simdega"],
    "Karnataka": ["Afzalpur", "Ainapur", "Aland", "Alur", "Anekal", "Ankola", "Arsikere", "Athani", "Aurad", "Bableshwar", "Badami", "Bagalkot", "Bagepalli", "Bailhongal", "Bangalore", "Bangalore Rural", "Bangarpet", "Bantwal", "Basavakalyan", "Basavanabagewadi", "Basavapatna", "Belgaum", "Bellary", "Belthangady", "Belur", "Bhadravati", "Bhalki", "Bhatkal", "Bidar", "Bijapur", "Biligi", "Chadchan", "Challakere", "Chamrajnagar", "Channagiri", "Channapatna", "Channarayapatna", "Chickmagalur", "Chikballapur", "Chikkaballapur", "Chikkanayakanahalli", "Chikkodi", "Chikmagalur", "Chincholi", "Chintamani", "Chitradurga", "Chittapur", "Cowdahalli", "Davanagere", "Deodurga", "Devangere", "Devarahippargi", "Dharwad", "Doddaballapur", "Gadag", "Gangavathi", "Gokak", "Gowribdanpur", "Gubbi", "Gulbarga", "Gundlupet", "H.B.Halli", "H.D. Kote", "Haliyal", "Hampi", "Hangal", "Harapanahalli", "Hassan", "Haveri", "Hebri", "Hirekerur", "Hiriyur", "Holalkere", "Holenarsipur", "Honnali", "Honnavar", "Hosadurga", "Hosakote", "Hosanagara", "Hospet", "Hubli", "Hukkeri", "Humnabad", "Hungund", "Hunsagi", "Hunsur", "Huvinahadagali", "Indi", "Jagalur", "Jamkhandi", "Jewargi", "Joida", "K.R. Nagar", "Kadur", "Kalghatagi", "Kamalapur", "Kanakapura", "Kannada", "Kargal", "Karkala", "Karwar", "Khanapur", "Kodagu", "Kolar", "Kollegal", "Koppa", "Koppal", "Koratageri", "Krishnarajapet", "Kudligi", "Kumta", "Kundapur", "Kundgol", "Kunigal", "Kurugodu", "Kustagi", "Lingsugur", "Madikeri", "Madugiri", "Malavalli", "Malur", "Mandya", "Mangalore", "Manipal", "Manvi", "Mashal", "Molkalmuru", "Mudalgi", "Muddebihal", "Mudhol", "Mudigere", "Mulbagal", "Mundagod", "Mundargi", "Murugod", "Mysore", "Nagamangala", "Nanjangud", "Nargund", "Narsimrajapur", "Navalgund", "Nelamangala", "Nimburga", "Pandavapura", "Pavagada", "Puttur", "Raibag", "Raichur", "Ramdurg", "Ranebennur", "Ron", "Sagar", "Sakleshpur", "Salkani", "Sandur", "Saundatti", "Savanur", "Sedam", "Shahapur", "Shankarnarayana", "Shikaripura", "Shimoga", "Shirahatti", "Shorapur", "Siddapur", "Sidlaghatta", "Sindagi", "Sindhanur", "Sira", "Sirsi", "Siruguppa", "Somwarpet", "Sorab", "Sringeri", "Sriniwaspur", "Srirangapatna", "Sullia", "T. Narsipur", "Tallak", "Tarikere", "Telgi", "Thirthahalli", "Tiptur", "Tumkur", "Turuvekere", "Udupi", "Virajpet", "Wadi", "Yadgiri", "Yelburga", "Yellapur"],
    "Kerala" : ["Adimaly", "Adoor", "Agathy", "Alappuzha", "Alathur", "Alleppey", "Alwaye", "Amini", "Androth", "Attingal", "Badagara", "Bitra", "Calicut", "Cannanore", "Chetlet", "Ernakulam", "Idukki", "Irinjalakuda", "Kadamath", "Kalpeni", "Kalpetta", "Kanhangad", "Kanjirapally", "Kannur", "Karungapally", "Kasargode", "Kavarathy", "Kiltan", "Kochi", "Koduvayur", "Kollam", "Kottayam", "Kovalam", "Kozhikode", "Kunnamkulam", "Malappuram", "Mananthodi", "Manjeri", "Mannarghat", "Mavelikkara", "Minicoy", "Munnar", "Muvattupuzha", "Nedumandad", "Nedumgandam", "Nilambur", "Palai", "Palakkad", "Palghat", "Pathaanamthitta", "Pathanamthitta", "Payyanur", "Peermedu", "Perinthalmanna", "Perumbavoor", "Punalur", "Quilon", "Ranni", "Shertallai", "Shoranur", "Taliparamba", "Tellicherry", "Thiruvananthapuram", "Thodupuzha", "Thrissur", "Tirur", "Tiruvalla", "Trichur", "Trivandrum", "Uppala", "Vadakkanchery", "Vikom", "Wayanad"],
    "Lakshadweep": ["Amini", "Androth", "Bitra", "Chetlet", "Kadmath", "Kalpeni", "Kavaratti", "Kiltan", "Minicoy"],
    "Madhya Pradesh": ["Ambah", "Badnagar", "Badnawar", "Badwani", "Bagli", "Baihar", "Balaghat", "Baldeogarh", "Baldi", "Bamori", "Banda", "Bandhavgarh", "Bareli", "Baroda", "Barwaha", "Barwani", "Batkakhapa", "Begamganj", "Beohari", "Berasia", "Berchha", "Betul", "Bhainsdehi", "Bhander", "Bhanpura", "Bhikangaon", "Bhimpur", "Bhind", "Bhitarwar", "Bhopal", "Biaora", "Bijadandi", "Bijawar", "Bijaypur", "Bina", "Birsa", "Birsinghpur", "Budhni", "Burhanpur", "Buxwaha", "Chachaura", "Chanderi", "Chaurai", "Chhapara", "Chhatarpur", "Chhindwara", "Chicholi", "Chitrangi", "Churhat", "Dabra", "Damoh", "Datia", "Deori", "Deosar", "Depalpur", "Dewas", "Dhar", "Dharampuri", "Dindori", "Gadarwara", "Gairatganj", "Ganjbasoda", "Garoth", "Ghansour", "Ghatia", "Ghatigaon", "Ghorandogri", "Ghughari", "Gogaon", "Gohad", "Goharganj", "Gopalganj", "Gotegaon", "Gourihar", "Guna", "Gunnore", "Gwalior", "Gyraspur", "Hanumana", "Harda", "Harrai", "Harsud", "Hatta", "Hoshangabad", "Ichhawar", "Indore", "Isagarh", "Itarsi", "Jabalpur", "Jabera", "Jagdalpur", "Jaisinghnagar", "Jaithari", "Jaitpur", "Jaitwara", "Jamai", "Jaora", "Jatara", "Jawad", "Jhabua", "Jobat", "Jora", "Kakaiya", "Kannod", "Kannodi", "Karanjia", "Kareli", "Karera", "Karhal", "Karpa", "Kasrawad", "Katangi", "Katni", "Keolari", "Khachrod", "Khajuraho", "Khakner", "Khalwa", "Khandwa", "Khaniadhana", "Khargone", "Khategaon", "Khetia", "Khilchipur", "Khirkiya", "Khurai", "Kolaras", "Kotma", "Kukshi", "Kundam", "Kurwai", "Kusmi", "Laher", "Lakhnadon", "Lamta", "Lanji", "Lateri", "Laundi", "Maheshwar", "Mahidpurcity", "Maihar", "Majhagwan", "Majholi", "Malhargarh", "Manasa", "Manawar", "Mandla", "Mandsaur", "Manpur", "Mauganj", "Mawai", "Mehgaon", "Mhow", "Morena", "Multai", "Mungaoli", "Nagod", "Nainpur", "Narsingarh", "Narsinghpur", "Narwar", "Nasrullaganj", "Nateran", "Neemuch", "Niwari", "Niwas", "Nowgaon", "Pachmarhi", "Pandhana", "Pandhurna", "Panna", "Parasia", "Patan", "Patera", "Patharia", "Pawai", "Petlawad", "Pichhore", "Piparia", "Pohari", "Prabhapattan", "Punasa", "Pushprajgarh", "Raghogarh", "Raghunathpur", "Rahatgarh", "Raisen", "Rajgarh", "Rajpur", "Ratlam", "Rehli", "Rewa", "Sabalgarh", "Sagar", "Sailana", "Sanwer", "Sarangpur", "Sardarpur", "Satna", "Saunsar", "Sehore", "Sendhwa", "Seondha", "Seoni", "Seonimalwa", "Shahdol", "Shahnagar", "Shahpur", "Shajapur", "Sheopur", "Sheopurkalan", "Shivpuri", "Shujalpur", "Sidhi", "Sihora", "Silwani", "Singrauli", "Sirmour", "Sironj", "Sitamau", "Sohagpur"],
    "Maharashtra": ["Achalpur", "Aheri", "Ahmednagar", "Ahmedpur", "Ajara", "Akalkot", "Akola", "Akole", "Akot", "Alibagh", "Amagaon", "Amalner", "Ambad", "Ambejogai", "Amravati", "Arjuni Merogaon", "Arvi", "Ashti", "Atpadi", "Aurangabad", "Ausa", "Babhulgaon", "Balapur", "Baramati", "Barshi Takli", "Barsi", "Basmatnagar", "Bassein", "Beed", "Bhadrawati", "Bhamregadh", "Bhandara", "Bhir", "Bhiwandi", "Bhiwapur", "Bhokar", "Bhokardan", "Bhoom", "Bhor", "Bhudargad", "Bhusawal", "Billoli", "Brahmapuri", "Buldhana", "Butibori", "Chalisgaon", "Chamorshi", "Chandgad", "Chandrapur", "Chandur", "Chanwad", "Chhikaldara", "Chikhali", "Chinchwad", "Chiplun", "Chopda", "Chumur", "Dahanu", "Dapoli", "Darwaha", "Daryapur", "Daund", "Degloor", "Delhi Tanda", "Deogad", "Deolgaonraja", "Deori", "Desaiganj", "Dhadgaon", "Dhanora", "Dharani", "Dhiwadi", "Dhule", "Dhulia", "Digras", "Dindori", "Edalabad", "Erandul", "Etapalli", "Gadhchiroli", "Gadhinglaj", "Gaganbavada", "Gangakhed", "Gangapur", "Gevrai", "Ghatanji", "Golegaon", "Gondia", "Gondpipri", "Goregaon", "Guhagar", "Hadgaon", "Hatkangale", "Hinganghat", "Hingoli", "Hingua", "Igatpuri", "Indapur", "Islampur", "Jalgaon", "Jalna", "Jamkhed", "Jamner", "Jath", "Jawahar", "Jintdor", "Junnar", "Kagal", "Kaij", "Kalamb", "Kalamnuri", "Kallam", "Kalmeshwar", "Kalwan", "Kalyan", "Kamptee", "Kandhar", "Kankavali", "Kannad", "Karad", "Karjat", "Karmala", "Katol", "Kavathemankal", "Kedgaon", "Khadakwasala", "Khamgaon", "Khed", "Khopoli", "Khultabad", "Kinwat", "Kolhapur", "Kopargaon", "Koregaon", "Kudal", "Kuhi", "Kurkheda", "Kusumba", "Lakhandur", "Langa", "Latur", "Lonar", "Lonavala", "Madangad", "Madha", "Mahabaleshwar", "Mahad", "Mahagaon", "Mahasala", "Mahaswad", "Malegaon", "Malgaon", "Malgund", "Malkapur", "Malsuras", "Malwan", "Mancher", "Mangalwedha", "Mangaon", "Mangrulpur", "Manjalegaon", "Manmad", "Maregaon", "Mehda", "Mekhar", "Mohadi", "Mohol", "Mokhada", "Morshi", "Mouda", "Mukhed", "Mul", "Mumbai", "Murbad", "Murtizapur", "Murud", "Nagbhir", "Nagpur", "Nahavara", "Nanded", "Nandgaon", "Nandnva", "Nandurbar", "Narkhed", "Nashik", "Navapur", "Ner", "Newasa", "Nilanga", "Niphad", "Omerga", "Osmanabad", "Pachora", "Paithan", "Palghar", "Pali", "Pandharkawada", "Pandharpur", "Panhala", "Paranda", "Parbhani", "Parner", "Parola", "Parseoni", "Partur", "Patan", "Pathardi", "Pathari", "Patoda", "Pauni", "Peint", "Pen", "Phaltan", "Pimpalner", "Pirangut", "Poladpur", "Pune", "Pusad", "Pusegaon", "Radhanagar"],
    "Manipur": ["Bishnupur", "Chandel", "Churachandpur", "Imphal", "Senapati", "Tamenglong", "Thoubal", "Ukhrul"],
    "Meghalaya": ["Baghmara", "Jowai", "Nongstoin", "Shillong", "Tura"],
    "Mizoram": ["Aizawl", "Champhai", "Kolasib", "Lawngtlai", "Lunglei", "Mamit", "Saiha", "Serchhip"],
    "Nagaland": ["Chumukedima", "Dimapur", "Kiphire", "Kohima", "Longleng", "Mokokchung", "Mon", "Phek", "Tuensang", "Wokha", "Zunheboto"],
    "Orissa": ["Angul", "Balangir", "Balasore", "Baripada", "Bargarh", "Baripada", "Baudh", "Berhampur", "Bhadrak", "Bhawanipatna", "Bhubaneswar", "Bolangir", "Chandbali", "Cuttack", "Debagarh", "Dhenkanal", "Gajapati", "Ganjam", "Jagatsinghapur", "Jajpur", "Jharsuguda", "Kalahandi", "Kandhamal", "Kendrapara", "Kendujhar", "Keonjhar", "Khurda", "Koraput", "Malkangiri", "Mayurbhanj", "Nabarangpur", "Nayagarh", "Nuapada", "Phulbani", "Puri", "Rayagada", "Sambalpur", "Subarnapur", "Sundargarh"],
    "Pondicherry": ["Karaikal", "Mahe", "Pondicherry", "Yanam"],
    "Punjab": ["Abohar", "Ajnala", "Amritsar", "Balachaur", "Barnala", "Batala", "Bathinda", "Chandigarh", "Dasua", "Dinanagar", "Faridkot", "Fatehgarh Sahib", "Fazilka", "Ferozepur", "Garhashanker", "Goindwal", "Gurdaspur", "Guruharsahai", "Hoshiarpur", "Jagraon", "Jalandhar", "Jugial", "Kapurthala", "Kharar", "Kotkapura", "Ludhiana", "Malaut", "Malerkotla", "Mansa", "Moga", "Muktasar", "Nabha", "Nakodar", "Nangal", "Nawanshahar", "Nawanshahr", "Pathankot", "Patiala", "Patti", "Phagwara", "Phillaur", "Phulmandi", "Quadian", "Rajpura", "Raman", "Rayya", "Ropar", "Rupnagar", "Samana", "Samrala", "Sangrur", "Sardulgarh", "Sarhind", "SAS Nagar", "Sultanpur Lodhi", "Sunam", "Tanda Urmar", "Tarn Taran", "Zira"],
    "Rajasthan": ["Abu Road", "Ahore", "Ajmer", "Aklera", "Alwar", "Amber", "Amet", "Anupgarh", "Asind", "Aspur", "Atru", "Bagidora", "Bali", "Bamanwas", "Banera", "Bansur", "Banswara", "Baran", "Bari", "Barisadri", "Barmer", "Baseri", "Bassi", "Baswa", "Bayana", "Beawar", "Begun", "Behror", "Bhadra", "Bharatpur", "Bhilwara", "Bhim", "Bhinmal", "Bikaner", "Bilara", "Bundi", "Chhabra", "Chhipaborad", "Chirawa", "Chittorgarh", "Chohtan", "Churu", "Dantaramgarh", "Dausa", "Deedwana", "Deeg", "Degana", "Deogarh", "Deoli", "Desuri", "Dhariawad", "Dholpur", "Digod", "Dudu", "Dungarpur", "Dungla", "Fatehpur", "Gangapur", "Gangdhar", "Gerhi", "Ghatol", "Girwa", "Gogunda", "Hanumangarh", "Hindaun", "Hindoli", "Hurda", "Jahazpur", "Jaipur", "Jaisalmer", "Jalore", "Jhalawar", "Jhunjhunu", "Jodhpur", "Kaman", "Kapasan", "Karauli", "Kekri", "Keshoraipatan", "Khandar", "Kherwara", "Khetri", "Kishanganj", "Kishangarh", "Kishangarhbas", "Kolayat", "Kota", "Kotputli", "Kotra", "Kotri", "Kumbalgarh", "Kushalgarh", "Ladnun", "Ladpura", "Lalsot", "Laxmangarh", "Lunkaransar", "Mahuwa", "Malpura", "Malvi", "Mandal", "Mandalgarh", "Mandawar", "Mangrol", "Marwar-Jn", "Merta", "Nadbai", "Nagaur", "Nainwa", "Nasirabad", "Nathdwara", "Nawa", "Neem Ka Thana", "Newai", "Nimbahera", "Nohar", "Nokha", "Onli", "Osian", "Pachpadara", "Pachpahar", "Padampur", "Pali", "Parbatsar", "Phagi", "Phalodi", "Pilani", "Pindwara", "Pipalda", "Pirawa", "Pokaran", "Pratapgarh", "Raipur", "Raisinghnagar", "Rajgarh", "Rajsamand", "Ramganj Mandi", "Ramgarh", "Rashmi", "Ratangarh", "Reodar", "Rupbas", "Sadulshahar", "Sagwara", "Sahabad", "Salumber", "Sanchore", "Sangaria", "Sangod", "Sapotra", "Sarada", "Sardarshahar", "Sarwar", "Sawai Madhopur", "Shahapura", "Sheo", "Sheoganj", "Shergarh", "Sikar", "Sirohi", "Siwana", "Sojat", "Sri Dungargarh", "Sri Ganganagar", "Sri Karanpur", "Sri Madhopur", "Sujangarh", "Taranagar", "Thanaghazi", "Tibbi", "Tijara", "Todaraisingh", "Tonk", "Udaipur", "Udaipurwati", "Uniayara", "Vallabhnagar", "Viratnagar"],
    "Sikkim": ["Gangtok", "Gyalshing", "Jorethang", "Mangan", "Namchi", "Naya Bazar", "Rangpo", "Singtam"],
    "Tamil Nadu" : ["Ambasamudram", "Anamali", "Arakandanallur", "Arantangi", "Aravakurichi", "Ariyalur", "Arkonam", "Arni", "Aruppukottai", "Attur", "Avanashi", "Batlagundu", "Bhavani", "Chengalpattu", "Chengam", "Chennai", "Chidambaram", "Chingleput", "Coimbatore", "Courtallam", "Cuddalore", "Cumbum", "Denkanikoitah", "Devakottai", "Dharampuram", "Dharmapuri", "Dindigul", "Erode", "Gingee", "Gobichettipalayam", "Gudalur", "Gudiyatham", "Harur", "Hosur", "Jayamkondan", "Kallkurichi", "Kanchipuram", "Kangayam", "Kanyakumari", "Karaikal", "Karaikudi", "Karur", "Keeranur", "Kodaikanal", "Kodumudi", "Kotagiri", "Kovilpatti", "Krishnagiri", "Kulithalai", "Kumbakonam", "Kuzhithurai", "Madurai", "Madurantgam", "Manamadurai", "Manaparai", "Mannargudi", "Mayiladuthurai", "Mayiladutjurai", "Mettupalayam", "Metturdam", "Mudukulathur", "Mulanur", "Musiri", "Nagapattinam", "Nagarcoil", "Namakkal", "Nanguneri", "Natham", "Neyveli", "Nilgiris", "Oddanchatram", "Omalpur", "Ootacamund", "Ooty", "Orathanad", "Palacode", "Palani", "Palladum", "Papanasam", "Paramakudi", "Pattukottai", "Perambalur", "Perundurai", "Pollachi", "Polur", "Pondicherry", "Ponnamaravathi", "Ponneri", "Pudukkottai", "Rajapalayam", "Ramanathapuram", "Rameshwaram", "Ranipet", "Rasipuram", "Salem", "Sankagiri", "Sankaran", "Sathiyamangalam", "Sivaganga", "Sivakasi", "Sriperumpudur", "Srivaikundam", "Tenkasi", "Thanjavur", "Theni", "Thirumanglam", "Thiruraipoondi", "Thoothukudi", "Thuraiyure", "Tindivanam", "Tiruchendur", "Tiruchengode", "Tiruchirappalli", "Tirunelvelli", "Tirupathur", "Tirupur", "Tiruttani", "Tiruvallur", "Tiruvannamalai", "Tiruvarur", "Tiruvellore", "Tiruvettipuram", "Trichy", "Tuticorin", "Udumalpet", "Ulundurpet", "Usiliampatti", "Uthangarai", "Valapady", "Valliyoor", "Vaniyambadi", "Vedasandur", "Vellore", "Velur", "Vilathikulam", "Villupuram", "Virudhachalam", "Virudhunagar", "Wandiwash", "Yercaud"],
    "Tripura": ["Agartala", "Ambassa", "Belonia", "Dhalai", "Kailashahar", "Kamalpur", "Khowai", "Udaipur"],
    "Uttar Pradesh": ["Achhnera", "Agra", "Akbarpur", "Aliganj", "Aligarh", "Allahabad", "Ambedkar Nagar", "Amethi", "Amiliya", "Amroha", "Anola", "Atrauli", "Auraiya", "Azamgarh", "Baberu", "Badaun", "Baghpat", "Bagpat", "Baheri", "Bahraich", "Ballia", "Balrampur", "Banda", "Bansdeeh", "Bansgaon", "Bansi", "Barabanki", "Bareilly", "Basti", "Bhadohi", "Bharthana", "Bharwari", "Bhogaon", "Bhognipur", "Bidhuna", "Bijnore", "Bikapur", "Bilari", "Bilgram", "Bilhaur", "Bindki", "Bisalpur", "Bisauli", "Biswan", "Budaun", "Budhana", "Bulandshahar", "Bulandshahr", "Capianganj", "Chakia", "Chandauli", "Charkhari", "Chhata", "Chhibramau", "Chirgaon", "Chitrakoot", "Chunur", "Dadri", "Dalmau", "Dataganj", "Debai", "Deoband", "Deoria", "Derapur", "Dhampur", "Domariyaganj", "Dudhi", "Etah", "Etawah", "Faizabad", "Farrukhabad", "Fatehpur", "Firozabad", "Garauth", "Garhmukteshwar", "Gautam Buddha Nagar", "Ghatampur", "Ghaziabad", "Ghazipur", "Ghosi", "Gonda", "Gorakhpur", "Gunnaur", "Haidergarh", "Hamirpur", "Hapur", "Hardoi", "Harraiya", "Hasanganj", "Hasanpur", "Hathras", "Jalalabad", "Jalaun", "Jalesar", "Jansath", "Jarar", "Jasrana", "Jaunpur", "Jhansi", "Jyotiba Phule Nagar", "Kadipur", "Kaimganj", "Kairana", "Kaisarganj", "Kalpi", "Kannauj", "Kanpur", "Karchhana", "Karhal", "Karvi", "Kasganj", "Kaushambi", "Kerakat", "Khaga", "Khair", "Khalilabad", "Kheri", "Konch", "Kumaon", "Kunda", "Kushinagar", "Lalganj", "Lalitpur", "Lucknow", "Machlishahar", "Maharajganj", "Mahoba", "Mainpuri", "Malihabad", "Mariyahu", "Math", "Mathura", "Mau", "Maudaha", "Maunathbhanjan", "Mauranipur", "Mawana", "Meerut", "Mehraun", "Meja", "Mirzapur", "Misrikh", "Modinagar", "Mohamdabad", "Mohamdi", "Moradabad", "Musafirkhana", "Muzaffarnagar", "Nagina", "Najibabad", "Nakur", "Nanpara", "Naraini", "Naugarh", "Nawabganj", "Nighasan", "Noida", "Orai", "Padrauna", "Pahasu", "Patti", "Pharenda", "Phoolpur", "Phulpur", "Pilibhit", "Pitamberpur", "Powayan", "Pratapgarh", "Puranpur", "Purwa", "Raibareli", "Rampur", "Ramsanehi Ghat", "Rasara", "Rath", "Robertsganj", "Sadabad", "Safipur", "Sagri", "Saharanpur", "Sahaswan", "Sahjahanpur", "Saidpur", "Salempur", "Salon", "Sambhal", "Sandila", "Sant Kabir Nagar", "Sant Ravidas Nagar", "Sardhana", "Shahabad", "Shahganj", "Shahjahanpur", "Shikohabad", "Shravasti", "Siddharthnagar", "Sidhauli", "Sikandra Rao", "Sikandrabad", "Sitapur", "Siyana", "Sonbhadra", "Soraon", "Sultanpur", "Tanda", "Tarabganj", "Tilhar", "Unnao", "Utraula", "Varanasi"],
    "Uttaranchal": ["Almora", "Bageshwar", "Chamoli", "Champawat", "Dehradun", "Garhwal", "Hardwar", "Nainital", "Pauri", "Pithoragarh", "Rudraprayag", "Tehri", "Udham Singh Nagar", "Uttarkashi"],
    "West Bengal" : ["Adra", "Alipurduar", "Amlagora", "Arambagh", "Asansol", "Balurghat", "Bankura", "Bardhaman", "Basirhat", "Berhampur", "Bethuadahari", "Birbhum", "Birpara", "Bishanpur", "Bolpur", "Bongoan", "Bulbulchandi", "Burdwan", "Calcutta", "Canning", "Champadanga", "Contai", "Cooch Behar", "Daimond Harbour", "Dalkhola", "Dantan", "Darjeeling", "Dhaniakhali", "Dhuliyan", "Dinajpur", "Dinhata", "Durgapur", "Gangajalghati", "Gangarampur", "Ghatal", "Guskara", "Habra", "Haldia", "Harirampur", "Harishchandrapur", "Hooghly", "Howrah", "Islampur", "Jagatballavpur", "Jalpaiguri", "Jhalda", "Jhargram", "Kakdwip", "Kalchini", "Kalimpong", "Kalna", "Kandi", "Karimpur", "Katwa", "Kharagpur", "Khatra", "Krishnanagar", "Mal Bazar", "Malda", "Manbazar", "Mathabhanga", "Medinipur", "Mekhliganj", "Mirzapur", "Murshidabad", "Nadia", "Nagarakata", "Nalhati", "Nayagarh", "Parganas", "Purulia", "Raiganj", "Rampur Hat", "Ranaghat", "Seharabazar", "Siliguri", "Suri", "Takipur", "Tamluk"],

};
const CropRecommend = ({name}) => {

    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const handleChangeState = (e) => {
        setSelectedState(e.target.value);
        setSelectedCity('');
        console.log('Selected State:', e.target.value);  
        setFormData({ ...formData, State: e.target.value });   
    };

    const handleChangeCity = (e) => {
        setSelectedCity(e.target.value);
        console.log('Selected City:', e.target.value);
        setFormData({ ...formData, City: e.target.value });
    };


    const [formData, setFormData] = useState({
        Nitrogen: '',
        Phosphorous: '',
        Postassium: '',
        Temperature: '',
        Humidity: '',
        ph: '',
        Rainfall: '',
        State: '',
        City: ''
    });
    const [errors, setErrors] = useState({
        Nitrogen: '',
        Phosphorous:'',
        Potassium:'',
        Temperature:'',
        Humidity:'',
        ph:'',
        Rainfall:'',

    });
    const [prediction, setPrediction] = useState(null); 


    const [imageUrl, setImageUrl] = useState('');
    const fetchImage = async (crop) => {
        try {
            const response = await axios.get(`https://api.unsplash.com/photos/random?query=${crop}&client_id=5LjYZkUMUsLX98mopF57FCXQ8QHFGzXeHI5z7MWMPbY`);
            setImageUrl(response.data.urls.regular);
        } catch (error) {
            console.error('Error fetching image:', error);
        }
    };
    useEffect(() => {
        if (prediction) {
            fetchImage(prediction);
        }
    }, [prediction]);

    const handleChange = (e) => { 
        const { name, value } = e.target;
        setFormData({ ...formData, [e.target.name]: e.target.value});
       if( name ==='ph')
       {
        if(value<0 || value>14)
        {
            setErrors({...errors, ph:'Enter the value between 0 to 14 !!!'})
        }
        else if(value<0)
        {
             setErrors({...errors, ph:'Enter the value greater than 0 !!!'})
        }
        else
        {
            setErrors({...errors, ph:''})
        }
       }

       if(name==='Nitrogen')
       {
           if(value.includes('.'))
           {
                setErrors({...errors, Nitrogen:'Enter Nitrogen value without decimal as it is % by weight value!!!'})
           }
           else if(value<0)
           {
                setErrors({...errors, Nitrogen:'Enter the value greater than 0 !!!'})
           }
           else
           {
               setErrors({...errors, Nitrogen:''})
           }
       }

       if(name==='Phosphorous')
       {
           if(value.includes('.'))
           {
                setErrors({...errors, Phosphorous:'Enter Phosphorous value without decimal as it is % by weight value!!!'})
           }
           else if(value<0)
           {
                setErrors({...errors, Phosphorous:'Enter the value greater than 0 !!!'})
           }
           else
           {
               setErrors({...errors, Phosphorous:''})
           }
       }
       if(name==='Potassium')
       {
           if(value.includes('.'))
           {
                setErrors({...errors, Potassium:'Enter Potassium value without decimal as it is % by weight value!!!'})
           }
           else
           {
               setErrors({...errors, Potassium:''})
           }
       }
       if(name==='Rainfall')
       {
            if(value<0)
            {
                setErrors({...errors, Rainfall:'Enter the value greater than 0 !!!'})
            }
            else if (value >300)
            {
                setErrors({...errors, Rainfall:'Enter the value less than 300 mm  !!!'})
            
            }
            else
            {
                setErrors({...errors, Rainfall:''})
            }
       }

       if(name==='Temperature')
       {
           if(value>50)
           {
                setErrors({...errors, Temperature:'Temperature should be below 50 C !!!'})
           }
           else
           {
               setErrors({...errors, Temperature:''})
           }
       }
       if(name==='Humidity')
       {
           if(value<0 || value>100)
           {
                setErrors({...errors, Humidity:'Enter the Humdiity value between 0 to 100  !!!'})
           }
           else
           {
               setErrors({...errors, Humidity:''})
           }
       }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Form Submitted');
        try {
            console.log('Form data:', formData);
            const response = await axios.post('http://localhost:5000/recommend', formData); // Adjust the endpoint URL accordingly
            console.log('Response',response.data); // Handle the response as needed
            const prediction = response.data.prediction;
            setPrediction(prediction);
        }
        catch (error) {
            console.error('Error occurred while making the request:', error);
        }
    };

  return (
    <div className="bg-gray-100 min-h-screen">
             <Navbar userName={name}/>
             <div className="container mx-auto px-4 pt-16 flex justify-center">
             <div className="max-w-md w-full mb-8"> {/* Add margin bottom here */}
             <h1 className="text-4xl font-bold mb-8 text-center" >Crop Suggestion </h1>
             <h2 className="text-2xl mb-4"> Crop Recommendation for Indian States </h2>
        <form onSubmit={handleSubmit}  className="space-y-4">
        <div class="form-group">
                <label htmlFor="Nitrogen" className="block text-lg font-medium text-gray-700">Nitrogen</label>
                <input type="number" className={`form-input mt-1 py-1 block w-full ${errors.Nitrogen ? 'border-red-500' : ''}`} name="Nitrogen" step="any" placeholder="Enter the value (example:50)" onChange={handleChange}  required/>
                {errors.Nitrogen && <p className="text-red-500 text-sm">{errors.Nitrogen}</p>}
        </div>
    <div class="form-group">
        <label htmlFor="Phosphorous" className="block text-lg font-medium text-gray-700">Phosphorous</label>
            <input type="number" className={`form-input mt-1 py-1 block w-full ${errors.Phosphorous ? 'border-red-500' : ''}`} name="Phosphorous" step="any"  placeholder="Enter the value (example:50)" onChange={handleChange} required/>
            {errors.Phosphorous&& <p className="text-red-500 text-sm">{errors.Phosphorous}</p>}
        </div>
    <div class="form-group">
        <label htmlFor="Potassium"className="block text-lg font-medium text-gray-700">Potassium</label>
            <input type="number" className={`form-input mt-1 py-1 block w-full ${errors.Potassium ? 'border-red-500' : ''}`} name="Postassium" step="any"  placeholder="Enter the value (example:50)" onChange={handleChange} required/>
            {errors.Potassium && <p className="text-red-500 text-sm">{errors.Potassium}</p>}
        </div>
        <div class="form-group">
                <label htmlFor="Temperature" className="block text-lg font-medium text-gray-700">Temperature</label>
                <input type="number" className={`form-input mt-1 py-1 block w-full ${errors.Temperature? 'border-red-500' : ''}`} name="Temperature" step="any" placeholder="Enter the value (example:50)" onChange={handleChange}  required/>
                {errors.Temperature && <p className="text-red-500 text-sm">{errors.Temperature}</p>}
        </div>
        <div class="form-group">
                <label htmlFor="Humidity" className="block text-lg font-medium text-gray-700">Humidity</label>
                <input type="number" className={`form-input mt-1 py-1 block w-full ${errors.Humidity ? 'border-red-500' : ''}`} name="Humidity" step="any" placeholder="Enter the value (example:50)" onChange={handleChange}  required/>
                {errors.Humidity && <p className="text-red-500 text-sm">{errors.Humidity}</p>}
        </div>
    <div class="form-group">
        <label htmlFor="ph" className="block text-lg font-medium text-gray-700">ph Level</label>
            <input type="number" className={`form-input mt-1 py-1 block w-full ${errors.ph ? 'border-red-500' : ''}`} name="ph" step="any" placeholder="Enter the value"  onChange={handleChange} required/>
            {errors.ph && <p className="text-red-500 text-sm">{errors.ph}</p>}
        </div>
    <div class="form-group">
        <label htmlFor="Rainfall" className="block text-lg font-medium text-gray-700">Rainfall (in mm)</label>
            <input type="number"className={`form-input mt-1 py-1 block w-full ${errors.Rainfall ? 'border-red-500' : ''}`} name="Rainfall" step="any" placeholder="Enter the value" onChange={handleChange} required/>
            {errors.Rainfall && <p className="text-red-500 text-sm">{errors.Rainfall}</p>}
        </div>
    <div class="form-group">
        <label htmlFor="State" className="block text-lg font-medium text-gray-700">Select the State from the list : </label>
        <select id="name" name="State" value={selectedState} onChange={handleChangeState} className="form-select mt-1 py-1 block w-full">
        <option value="">Select from the list of States</option>
        {State.map((state) => ( <option value={state}>{state}</option>))}

            </select>
       
    </div>
    <div class="form-group">
        <label htmlFor="City" className="block text-lg font-medium text-gray-700">Select  the City Name </label>
        <select id="City" name="City" value={formData.City} onChange={handleChangeCity} className="form-select mt-1  py-1 block w-full">

        <option value="">Select from the list of Cities</option>
                {citiesbyState[selectedState] && citiesbyState[selectedState].map((city) => <option key={city} value={city}>{city}</option>)}
        </select>
   
        </div>
    
    <br/>
    <button type="submit"  className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">Recommend</button>

</form>

{prediction && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="bg-gray-900 bg-opacity-75 absolute inset-0"></div>
                    <div className="relative bg-white rounded-lg px-8 py-6 shadow-xl z-10">
                        <div className="flex items-center justify-center mb-4">
                            <h2 className="text-lg font-bold">Crop Recommendation</h2>
                        </div>
                        <div className="flex items-center justify-center mb-4">
                            {imageUrl ? (
                                <img src={imageUrl} alt={prediction} className="w-40 h-40 rounded-full" />
                            ) : (
                                <div className="w-40 h-40 bg-gray-200 flex items-center justify-center rounded-full">
                                    <p className="text-gray-500">Image Loading...</p>
                                </div>
                            )}
                        </div>
                        <p className="text-gray-700 mb-4">Congratulations! You can grow "{prediction}" in your farm</p>
                        <button onClick={() => setPrediction(null)} className="bg-blue-500 text-white font-semibold py-2 px-4 rounded hover:bg-blue-600">Close</button>
                    </div>
                </div>
            )}


    

</div>
</div>

<Footer />
    </div>
  )
}

export default CropRecommend
