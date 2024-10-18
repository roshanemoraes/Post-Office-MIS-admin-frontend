import React from "react";
import { PROJECTS } from "./Constants";

const Services = () => {
  return (
    <div id="services" className="border-b border-neutral-900 pb-4">
      <h1 className="my-20 text-center text-4xl">SERVICES</h1>
      <div>
        {PROJECTS.map((project, index) => (
          <div key={index} className="mb-8 flex flex-wrap lg:justify-center">
            <div className="w-full lg:w-1/4">
              <img
                src={project.image}
                width={300}
                height={150}
                alt={project.title}
                className="mb-6 rounded transition-transform duration-300 ease-in-out transform hover:scale-110 hover:shadow-lg"
              />
            </div>
            <div className="w-full max-w-xl lg:w-3/4">
              <h6 className="mb-2 font-semibold text-[#852318] text-3xl">
                {project.title}
              </h6>
              <p className="mb-4 text-neutral-400 text-justify">
                {project.description}
              </p>
              {/*{project.technologies.map((tech, index) => (
                <span
                  key={index}
                  className="mr-2 rounded bg-neutral-900 px-2 py-1 text-sm font-medium text-purple-900"
                >
                  {tech}
                </span>
              ))}*/}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
