'use client';
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle,
  Clock,
  Lightbulb,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/app/components/ui/card';
import Link from 'next/link';
import { useStoreUserEffect } from '@/lib/useStoreUserEffect';
import Image from 'next/image';

export default function Home() {
  const { isAuthenticated } = useStoreUserEffect();
  console.log('isAuthenticated :', isAuthenticated);
  return (
    <div className="flex min-h-[calc(100vh_-_65px)] flex-col ">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative py-10 md:py-20 lg:py-28 overflow-hidden">
          <div className=" px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center max-w-7xl mx-auto">
              <div className="space-y-4">
                <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                  English Language Mentoring
                </div>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Consistency Over Intensity
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Ми наставляємо вас не лише у вивченні англійської мови, але й
                  у формуванні звички практикувати її щодня. Без зубріння. Без
                  вигорання. Реальний прогрес завдяки щоденним маленьким крокам.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <Link
                    href="/daily-practice"
                    className="text-white h-9 px-4 py-2 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive bg-emerald-600 hover:bg-emerald-700"
                  >
                    Розпочати
                  </Link>
                </div>
              </div>
              <div className="relative lg:ml-auto">
                <Image
                  src="/hero.png"
                  alt="English mentoring illustration"
                  width={800}
                  height={800}
                  className="mx-auto rounded-lg object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Philosophy Section */}
        <section id="philosophy" className="py-16 md:py-24 bg-emerald-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Наше бачення
                </h2>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <Image
                src="/philosophy.png"
                width={800}
                height={800}
                alt="Consistent learning illustration"
                className="mx-auto  rounded-xl sm:w-full lg:order-last"
              />
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li className="flex items-start gap-4">
                    <CheckCircle className="mt-1 h-6 w-6 flex-none text-emerald-600" />
                    <div>
                      <h3 className="text-xl font-bold">
                        Щоденні маленькі кроки
                      </h3>
                      <p className="text-muted-foreground">
                        Лише 15-30 хвилин щодня забезпечує тривалий прогрес і
                        формує нейронні шляхи для засвоєння мови.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="mt-1 h-6 w-6 flex-none text-emerald-600" />
                    <div>
                      <h3 className="text-xl font-bold">Менторство</h3>
                      <p className="text-muted-foreground">
                        Наявність ментора, який буде з вами щодня, збільшує ваші
                        шанси досягти своїх навчальних цілей на 95%.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle className="mt-1 h-6 w-6 flex-none text-emerald-600" />
                    <div>
                      <h3 className="text-xl font-bold">Стійкий прогрес</h3>
                      <p className="text-muted-foreground">
                        Без вигорання, без зубріння. Ми допомагаємо вам створити
                        стійку практику, яка впишеться у ваше життя.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Як це працює
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Наш структурований підхід допоможе вам виробити звичку
                  щоденної практики англійської мови.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 pt-12">
              <Card className="flex flex-col items-center text-center">
                <CardHeader className="w-full">
                  <div className="p-2 rounded-full bg-emerald-100 inline-flex mb-4">
                    <Calendar className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    Щоденні зустрічі
                  </CardTitle>
                  <CardDescription>
                    Короткі щоденні заняття з ментором для практики та рев'ю
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Наші ментори щодня перевіряють вас, щоб переконатися, що ви
                    досягаєте своїх навчальних цілей
                  </p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center text-center">
                <CardHeader className="w-full">
                  <div className="p-2 rounded-full bg-emerald-100 inline-flex mb-4">
                    <Clock className="h-6 w-6 text-emerald-600" />
                  </div>
                  <CardTitle className="text-2xl font-bold">
                    Мікронавчання
                  </CardTitle>
                  <CardDescription>
                    Короткі цілеспрямовані дії, які вписуються у ваш напружений
                    графік
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Наші завдання розраховані на виконання за 15-30 хвилин, що
                    дозволяє легко включити вивчення мови у ваш розпорядок дня.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Activities Section */}
        <section id="activities" className="py-16 md:py-24 bg-emerald-50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Щоденні завдання
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Щоденні вправи, які роблять вивчення англійської веселим та
                  ефективним.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5 text-emerald-600" />
                    Щоденні читання
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Короткі, цікаві тексти всіх рівнів та інтересів. Поступово
                    збільшуйте словниковий запас і розуміння.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                  >
                    Sample Text <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lightbulb className="h-5 w-5 text-emerald-600" />
                    Щоденні ідіоми
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Щодня вивчайте одну нову англійську ідіому з прикладами,
                    примітками щодо використання та можливостями для практики.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                  >
                    Today's Idiom <ArrowRight className="ml-2 size-4" />
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <img src="/bee.svg" className="size-5 filter-green" />
                    Spelling Bee
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Веселі, завдання з орфографії, які покращують ваш
                    словниковий запас та розпізнавання слів.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button
                    variant="ghost"
                    className="w-full text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                  >
                    Play Demo <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Success Stories
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our students who have transformed their English
                  through daily practice.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 md:grid-cols-2 gap-8 pt-12">
              <Card className="border-emerald-100">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src="/vercel.svg"
                      alt="Maria"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle>Maria S.</CardTitle>
                      <CardDescription>Business Professional</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic">
                    "After years of on-and-off English learning, LinguaPartner
                    finally helped me build a consistent habit. Just 15 minutes
                    a day for 6 months, and I'm now confidently leading meetings
                    in English!"
                  </p>
                </CardContent>
              </Card>
              <Card className="border-emerald-100">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <img
                      src="/vercel.svg"
                      alt="Hiroshi"
                      width={60}
                      height={60}
                      className="rounded-full"
                    />
                    <div>
                      <CardTitle>Hiroshi T.</CardTitle>
                      <CardDescription>Engineering Student</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic">
                    "The daily accountability was game-changing for me. I've
                    tried many apps before, but having a real mentor check in
                    with me daily made all the difference. My TOEFL score
                    improved by 23 points!"
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Готові будувати звичку вивчати англійську?
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed text-center">
                  Почніть свій шлях до вільного володіння англійською з щоденних
                  маленьких кроків і послідовної практики.
                </p>
              </>
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button className="text-lg px-8 py-6 bg-emerald-600 hover:bg-emerald-700 cursor-pointer">
                  Заплануйте безкоштовне пробне заняття
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-muted/40 ">
        <div className="container flex flex-col gap-6 py-8 md:py-12 mx-auto">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 justify-between p-6 md:p-0">
            <div className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-emerald-600" />
              <span className="text-xl font-bold">English Щодня</span>
            </div>
            <nav className="grid grid-cols-2 sm:grid-cols-4 gap-8">
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Product</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Features
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Pricing
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Company</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      About
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Careers
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Resources</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Community
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Support
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-medium">Legal</h4>
                <ul className="space-y-2">
                  <li>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Terms
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Cookie Policy
                    </a>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center border-t pt-8">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} LinguaPartner. All rights
              reserved.
            </p>
            <div className="flex items-center gap-4 mt-4 md:mt-0">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Twitter</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">Instagram</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <span className="sr-only">LinkedIn</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect width="4" height="12" x="2" y="9"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
