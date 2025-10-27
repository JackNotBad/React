import notreHistoire from "../assets/About/notre-histoire.png"
import nosValeurs from "../assets/About/nos-valeurs.png"
import notreVision from "../assets/About/notre-vision.png"
import bob from "../assets/About/bob.png"
import tom from "../assets/About/tom.png"
import Carousel from "../components/Carousel";
import carousel1 from "../assets/About/carouselAbout1.png"
import carousel2 from "../assets/About/carouselAbout2.png"
import carousel3 from "../assets/About/carouselAbout3.png"
import carousel4 from "../assets/About/carouselAbout4.png"
import carousel5 from "../assets/About/carouselAbout5.png"
import carousel6 from "../assets/About/carouselAbout6.png"
import carousel7 from "../assets/About/carouselAbout7.png"

export default function About() {
      const photos = [
      carousel1,
      carousel2,
      carousel3,
      carousel4,
      carousel5,
      carousel6,
      carousel7,
    ];

  return (
    <>
            <section 
            className="
              flex flex-col text-center
              max-w-150 mx-auto p-5 box-content
              lg:flex-row lg:text-left lg:max-w-300
            ">
              <div>
                <img
                  src={bob}
                  className="
                  object-contain
                  max-w-50
                  mx-auto mt-11
                  lg:mt-0 lg:mx-0 lg:max-w-135 lg:w-135 lg:max-h-130 
                "
                  alt="lead of the canopees team"
                />
                <div
                  className="
                  mb-0 mt-5 text-center
                  lg:mt-0 lg:mx-10 lg:max-w-135 lg:w-135 lg:max-h-130 lg:h-70 
                ">
                  <h2>Bob</h2>
                  <p>Un des deux passionnées de la nature</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id lacus viverra, pretium metus et, condimentum leo. Sed lacus sapien, accumsan ut tellus vel, sollicitudin aliquam ligula. Donec ex metus, vehicula in magna eu, semper pulvinar felis. Curabitur elementum gravida leo, ut fringilla est placerat eu. Suspendisse potenti. Maecenas sapien justo, semper non finibus sit amet, elementum nec arcu. Phasellus vitae mi mollis, rhoncus ex aliquam, pulvinar sem.
                  </p>
                </div>
              </div>
              <div>
                <img
                  src={tom}
                  className="
                  object-contain
                  max-w-50
                  mx-auto mt-11
                  lg:mt-0 lg:mx-0 lg:mr-26 lg:max-w-135 lg:w-135 lg:max-h-130 lg:h-130
                "
                  alt="lead of the canopees team"
                />
                <div
                  className="
                  mb-0 mt-5 text-center
                  lg:mt-0 lg:mx-0 lg:mr-26 lg:max-w-135 lg:w-135 lg:max-h-130 lg:h-70
                ">
                  <h2>Tom</h2>
                  <p>Un des deux passionnées de la nature</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id lacus viverra, pretium metus et, condimentum leo. Sed lacus sapien, accumsan ut tellus vel, sollicitudin aliquam ligula. Donec ex metus, vehicula in magna eu, semper pulvinar felis. Curabitur elementum gravida leo, ut fringilla est placerat eu. Suspendisse potenti. Maecenas sapien justo, semper non finibus sit amet, elementum nec arcu. Phasellus vitae mi mollis, rhoncus ex aliquam, pulvinar sem.
                  </p>
                </div>
              </div>
            </section>
            <section 
            className="
              flex flex-col text-center
              max-w-150 mx-auto p-5 box-content
              lg:flex-row lg:text-left lg:max-w-300 lg:py-26
            ">
              <img
                src={notreHistoire}
                className="
                object-contain
                max-w-88 w-full 
                mx-auto mt-11
                lg:mt-0 lg:mx-0 lg:mr-26 lg:max-w-135 lg:w-135 lg:max-h-130 lg:h-130
              "
                alt="part of the canopees team"
              />
              <div 
                className="
                mb-0 mt-5
                lg:mt-0 lg:mx-0 lg:mr-26 lg:max-w-135 lg:w-135 lg:max-h-130 lg:h-130
              ">
                <h2>Notre histoire</h2>
                <p>Depuis 2020, Canopées entretiennent les jardins.</p>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id lacus viverra, pretium metus et, condimentum leo. Sed lacus sapien, accumsan ut tellus vel, sollicitudin aliquam ligula. Donec ex metus, vehicula in magna eu, semper pulvinar felis. Curabitur elementum gravida leo, ut fringilla est placerat eu. Suspendisse potenti. Maecenas sapien justo, semper non finibus sit amet, elementum nec arcu. Phasellus vitae mi mollis, rhoncus ex aliquam, pulvinar sem.
                </p>
              </div>
            </section>
            <section 
            className="
              flex flex-col text-center
              max-w-150 mx-auto px-5 pt-12 pb-38 box-content
              lg:pt-18 lg:pb-30
              lg:flex-row lg:text-left lg:max-w-300 lg:py-26
            ">
              <div 
                className="
                mb-0 order-2 mt-5
                lg:mt-0 lg:mx-0 lg:mr-26 lg:max-w-135 lg:w-135 lg:max-h-130 lg:h-130 lg:order-0
              ">
                <h2>Nos valeurs</h2>
                <p>
                  Praesent lorem lorem, placerat non orci a, faucibus posuere turpis. Nunc nec pharetra risus, vitae aliquam eros. Fusce venenatis nibh finibus, molestie tellus sed, gravida nisl. Quisque sit amet purus sagittis, mattis augue vitae, sodales erat. Fusce vel pellentesque erat. In ultrices, nunc ut tristique ultricies, libero nibh finibus nisi, ac faucibus velit velit et leo. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Etiam dapibus pretium risus, id condimentum libero gravida efficitur. Aenean vestibulum interdum dui, vel molestie nunc blandit non. Maecenas vel facilisis arcu. Sed varius tristique ultricies. Nulla facilisi. Proin sit amet nunc non urna sodales finibus ut id leo. Fusce in mattis neque, nec gravida justo.
                </p>
              </div>
              <img
                src={nosValeurs}
                className="
                object-contain
                max-w-88 w-full 
                mx-auto mt-11
                lg:mt-0 lg:mx-0 lg:mr-26 lg:max-w-135 lg:w-135 lg:max-h-130 lg:h-130
              "
                alt="part of the canopees team"
              />
            </section>
            <section className="flex-col max-w-300 px-5 mx-auto box-content flex">
              <Carousel photos={photos} startIndex={3}/>
            </section>
            <section 
            className="
              flex flex-col text-center
              max-w-150 mx-auto px-5 pt-12 box-content
              lg:flex-row lg:text-left lg:max-w-300 lg:py-26
            ">
              <img
                src={notreVision}
                className="
                object-contain
                max-w-88 w-full 
                mx-auto mt-20
                lg:mt-0 lg:mx-0 lg:mr-26 lg:max-w-135 lg:w-135 lg:max-h-130 lg:h-130
              "
                alt="part of the canopees team"
              />
              <div 
                className="
                mb-0 mt-5
                lg:mt-0 lg:mx-0 lg:mr-26 lg:max-w-135 lg:w-135 lg:max-h-130 lg:h-130
              ">
                <h2>Notre Vision</h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed id lacus viverra, pretium metus et, condimentum leo. Sed lacus sapien, accumsan ut tellus vel, sollicitudin aliquam ligula. Donec ex metus, vehicula in magna eu, semper pulvinar felis. Curabitur elementum gravida leo, ut fringilla est placerat eu. Suspendisse potenti. Maecenas sapien justo, semper non finibus sit amet, elementum nec arcu. Phasellus vitae mi mollis, rhoncus ex aliquam, pulvinar sem.
                </p>
              </div>
            </section>
    </>
  )
}