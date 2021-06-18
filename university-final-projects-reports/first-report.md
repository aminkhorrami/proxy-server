# first report

**گزارش اول درس پروژه ترم ۱۳۹۹-۱۴۰۰ کارشناسی**

با سلام و خسته نباشید خدمت شما استاد عزیز

استاد بنده خدمتتون گزارشی از پروژه ایی که تا اینجا پیاده کردم رو ارسال میکنم.

\(‌بسیار پوزش میخوام بابت تاخیری که در ارسال این گزارش به وجود اومد. بخاطر کرونا مدت زیادی از تمام کارهام عقب افتادم\).

همونطور که خدمتتون عرض کردم بنده اسکوپ پروژه رو در دنیای بلاکچین و [smart contract](https://ethereum.org/en/developers/docs/smart-contracts/) ها انتخاب کردم. علت این انتخابم هم بررسی بیشتر و کامل تر کاربردهای حوزه بلاکچین در فعالیت های روزمره و یک قیاس قابل درک برای خودم بوده.

تو این برهه من با بررسی سه شبکه با پشتیبانی از قرار دادهای هوشمند \([neo](https://neo.org/dev), [cardano](https://docs.cardano.org/en/latest/explainers/cardano-explainers/smart-contract-exp.html), [etheruem](https://ethereum.org/en/developers/docs/smart-contracts/)\) به انتخاب شبکه اتریوم پرداختم. علت اصلی انتخاب هم از اونجا میاد که کامیونتی پشت شبکه اتریوم و منحصرا زبان [solidity](https://docs.soliditylang.org/en/develop/index.html) از میزان خیلی بیشتری به نسبت شبکه های دیگه هست. \(‌تو این مقطع میتونم راحت تر پاسخ هامو پیدا کنم با بچه هایی که تو این زمینه مشغول هستند.\)

پروژه ایی که پیاده شده تا به این لحظه به شکل یک فروشگاه خرید و فروش با ثبت درخواست مشخصات محصول از جانب فروشنده\( قیمت و نام محصول\)، و خرید اون از جانب خریدار با بررسی شروط مشخص بوده. همونطور که مستحضرید تو شبکه اتریوم واحدیی که لحاظ میشه برای پرداخت ها به [Gwei](https://ethereum.org/en/developers/docs/gas/) هست و تمامی تراکنش ها با فرمول مشخصی ملزوم پرداخت فی هستن.\( از deployment قراردادمون به روی شبکه به عنوان deployer تا به انتقال وجه به کیف پول های متفاوت مبلغی رو به عنوان کارمزد شبکه برای گرفتن تاییدیه شبکه نیاز هست پرداخت کنیم\). از طرفی چون هزینه های شبکه الان به شدت بالاست و عملا نیاز هست دولوپ روی یک بستر تست صورت بگیره، من از [Kovan Testnet](https://kovan-testnet.github.io/website/)

[https://kovan-testnet.github.io/website/](https://kovan-testnet.github.io/website/)

برای دیپلوی استفاده کردم و از faucet این شبکه اترهامو دریافت میکنم.

توجه: تا جایی که به حوزه بلاکچین مربوط هست سعی میکنم تمامی تعاریف رو در ادامه پیاده سازی با جزییات ذکر کنم ولیکن چون بحث های frontEnd و ابزارها هم مربوطه سعی میکنم رجوع های مشخص رو برای هر بخش هم ذکر کنم.

**مراحل پیاده سازی**

برای همراه شدن با کد از اینجا به بعد میتونید از لینک زیر کد پیاده شده رو مشاهده کنید:

https://github.com/aminkhorrami/simple\_purchase\_app\_on\_ethereum

برای شروع باید ذکر کنم که اصولا چون بروزر های فعلی ما از api های شبکه های بلاکچینی برخوردار نیستن ما نیاز داریم که اول بروزرهامون رو با افزونه های مشخصی به این دنیا متصل کنیم! [Metamask](https://metamask.io/) از محصولات خوبیه که مثل یه gateway هم شما رو به این دنیای dapps ها متصل میکنه \( چون اینجا دیگه از اون رویکرد centralized خبری نیست مشخصا\)، و از طرفی یک ولت رو هم رو بروزرتون درست میکنه که کار رو خیلی راحت میکنه.\(‌ راحت میشه حساب ها رو track کرد.\)

لطفا قبل از هر کاری نسخه مناسب طبق بروزرتون رو دریافت کنید:

Chrome: [https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn](https://chrome.google.com/webstore/detail/nkbihfbeogaeaoehlefnkodbefgpgknn)

Firefox: [https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/](https://addons.mozilla.org/en-US/firefox/addon/ether-metamask/)

برای شروع پروژه از ابزار [truffle](https://www.trufflesuite.com/) استفاده کردم که یه محیط تست و دولاپ مشخصی رو برای پروژه فراهم میکنه. زبان[solidity](https://docs.soliditylang.org/en/develop/index.html)

[https://docs.soliditylang.org/en/develop/index.html](https://docs.soliditylang.org/en/develop/index.html)

همونطور که ذکر کردم برای نوشتن قرارداد استفاده شده. یک زبان object-orientetd و خیلی مشابه به c++. رویه کار تو بخش کانترکت نویسی به شکل زیر هست:

قرارداد با ساختار کد و قوانینی که من تعریف کردم نوشته شده، بعد از اون باید دونست که چون عملا کانترکت های ما immutable هستند قبل از اینکه به شبکه دیپلوی بشن نیازه که براشون تست نویسی صورت بگیره! که این تست ها با استفاده از ابزار [mochaJs](https://mochajs.org/) انجام شده و قابل مشاهده است. \(‌ از testCase های مشخص هر خرید مثل برابر بودن هزینه پرداخت با قیمت کالا، نخریدن محصول فروشنده از خودش و یا داشتن قیمت محصول از جانب فروشنده\). بعد از اون کامپایل کانترکت و ساخته شدن فایل [abi](https://docs.soliditylang.org/en/v0.5.3/abi-spec.html#:~:text=The%20Contract%20Application%20Binary%20Interface,as%20described%20in%20this%20specification.)

بعد از نوشتن قرار داد برای اینکه بدونیم migration به صورت کامل و درست روی شبکه انجام میشه \(\(kovan test-net

این نیاز حس میشه که روی یک شبکه خصوصی روی لوکال هاست سیستم این اتفاق انجام بشه که به کمک ابزار [granche](https://www.trufflesuite.com/docs/ganache/overview) اینکار رو انجام میدیم.

[https://www.trufflesuite.com/docs/ganache/overview](https://www.trufflesuite.com/docs/ganache/overview)

در ادامه در بخش فرانت، باید توجه کنید که ما با معقوله ی [web3](https://web3js.readthedocs.io/en/v1.3.4/) سر و کار داریم که ابزار ما در محیط فرانت برای دسترسی به شبکه اتریوم هست. در نتیجه تو این پارت از این ماژول استفاده کردم. ساختار فرانت روی لایبرری [react](https://reactjs.org/) هست که کار رو برای فرانت راحت تر و ملموس تر میکنه. با کمک لینک زیر اتصال بین web3, react و browser رو انجام دادم.

[https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8](https://medium.com/metamask/https-medium-com-metamask-breaking-change-injecting-web3-7722797916a8)

و عملا نتیجه در این بخش مشهود میشه.

برای دیپلوی کردن به روی تست نت من از پلتفرم زیر استفاده کردم:

[https://remix.ethereum.org/](https://remix.ethereum.org/)

برای داشتن اتر رایگان لطفا از پلتفرم زیر استفاده کنید:

https://faucet.kovan.network/

در اینجا هم شما میتونید برنامه رو با داشتن نت ماسک به روی بروزرتون مشاهده کنید.\(‌ روی پلتفرم هیروکو برنامه رو دیپلوی کردم.\):

[https://buy-and-sell-on-kovan.herokuapp.com/](https://buy-and-sell-on-kovan.herokuapp.com/)

**فاز بعدی پروژه**

در ادامه پروژه اگر شما استاد موافق باشید بنده قصد دارم ساختار یک game رو به بخش فرانت اضافه کنم و همینطور معقوله ی خرید و فروش کالا رو به عنوان ساختار اصلی بازی پیش ببرم و قوانین مالی مشخصی رو وضع کنم که به یک قرارداد هوشمند پیچیده تری از جانب قوانین مالی برسم. خیلی سعی دارم مساعل مالی رو تو صنعت بلاکچین بیشتر بررسی کنم که فکر میکنم مسیر جالبی برای پیشروی باشه این ساختار بازی و گردش مالی.

از کتاب Kedar\_Iyer,\_Chris\_Dannen\_Building\_games\_with\_Ethereum\_smart\_contracts سعی دارم برای پیاده سازی بخش فرانت کمک بگیرم. لینکی رو پایین تر از کتاب قرار میدم.

https://www.dropbox.com/s/e2da31lgajrgioe/Kedar\_Iyer%2C\_Chris\_Dannen\_Building\_games\_with\_Ethereum\_smart\_contracts.pdf?dl=0

بسیار ممنونم بابت وقتی که گذاشتید. ممنون میشم نظرتون رو در مورد ادامه پروژه به بنده بگید استاد.

امین خرمی

