"use client";
import React, { useState } from "react";
import "./ListCarPageLayout.scss";
import { useForm } from "react-hook-form";
import Image from "next/image";
import SecHeading from "@/Components/SecHeading/SecHeading";
function ListCarPageLayout() {
  const [companyLogoPreview, setCompanyLogoPreview] = useState(null);
  const [companyLicensePreview, setCompanyLicensePreview] = useState(null);
  const handleImageChange = (e, setPreview, fieldName) => {
    const file = e.target.files[0];
    if (file) {
      // Convert the file to a blob and create a URL
      const blob = new Blob([file], { type: file.type });
      const url = URL.createObjectURL(blob);

      // Set the preview image as the URL of the Blob
      setPreview(url);

      // Manually set the value for the file input as a Blob
      setValue(fieldName, blob, { shouldValidate: true });
    }
  };
  const defaultValues = {
    name: "",
    company_name: "",
    job_title: "",
    fleet_size: "",
    contact_no: "",
    email_address: "",
    country: "",
    city: "",
    company_license_expiry: "",
    service_type: "",
  };
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues, // Passing default values
  });
  const onSubmit = (data) => {
    console.log("Form data received from React Hook Form: ", data); // Log the raw data object

    // Create a FormData object
    const formData = new FormData();

    // Append flat and nested fields from `data` object
    for (const key in data) {
      if (typeof data[key] === "object" && !Array.isArray(data[key])) {
        // For nested objects, append each key-value pair
        for (const nestedKey in data[key]) {
          formData.append(`${key}[${nestedKey}]`, data[key][nestedKey]);
        }
      } else {
        formData.append(key, data[key]);
      }
    }

    // Log the contents of FormData
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    console.log("FormData prepared for submission");
  };

  const images = new Array(12).fill(""); // Array with 12 empty elements (you can replace "" with actual image sources if available)

  return (
    <>
      <section className="joinNow">
        <div className="customContainer">
          <div className="contentRow">
            <div className="contentCol">
              <div className="content">
                <SecHeading heading="JOIN NOW" />
                <p>
                  Join OneTapDrive to profit from over 1 million page views
                  every month, with more than 50,000 quality leads sent to car
                  rental companies and brokers all across the world.
                </p>
                <ul>
                  <li>
                    <i className="fas fa-check"></i> Get direct leads via phone,
                    SMS and emails.
                  </li>
                  <li>
                    <i className="fas fa-check"></i> Full training provided for
                    your staff to use the CMS.
                  </li>
                  <li>
                    <i className="fas fa-check"></i> Assistance from your
                    dedicated Account Manager.
                  </li>
                  <li>
                    <i className="fas fa-check"></i> Tools and resources to plan
                    your marketing strategy.
                  </li>
                  <li>
                    <i className="fas fa-check"></i> Exclusive member benefits
                  </li>
                </ul>
              </div>
            </div>
            <div className="contentCol">
              <form className="listForm" onSubmit={handleSubmit(onSubmit)}>
                <div className="contentRow">
                  <div className="contentCol">
                    <div
                      className={`inputCont full ${
                        errors?.name ? "error" : ""
                      }`}
                    >
                      <label htmlFor="name">
                        Your Name<span className="required">*</span>
                      </label>
                      <input
                        className={`${errors?.name ? "errorInput" : ""}`}
                        {...register("name", {
                          required: "Your name is required.",
                        })}
                        type="text"
                        placeholder="Enter Your Name"
                        id="name"
                      />

                      {errors?.name ? (
                        <p className="errorText">{errors.name.message}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="contentCol">
                    <div
                      className={`inputCont full ${
                        errors?.company_name ? "error" : ""
                      }`}
                    >
                      <label htmlFor="company_name">
                        Company Name<span className="required">*</span>
                      </label>
                      <input
                        className={`${
                          errors?.company_name ? "errorInput" : ""
                        }`}
                        {...register("company_name", {
                          required: "Company Name is required.",
                        })}
                        type="text"
                        placeholder="Enter Your Company Name"
                        id="company_name"
                      />

                      {errors?.company_name ? (
                        <p className="errorText">
                          {errors.company_name.message}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="contentCol">
                    <div
                      className={`inputCont full ${
                        errors?.job_title ? "error" : ""
                      }`}
                    >
                      <label htmlFor="job_title">
                        Job Title<span className="required">*</span>
                      </label>
                      <input
                        className={`${errors?.job_title ? "errorInput" : ""}`}
                        {...register("job_title", {
                          required: "Job Title is required.",
                        })}
                        type="text"
                        placeholder="Enter Job Title"
                        id="job_title"
                      />

                      {errors?.job_title ? (
                        <p className="errorText">{errors.job_title.message}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="contentCol">
                    <div
                      className={`inputCont ${
                        errors?.fleet_size ? "error" : ""
                      }`}
                    >
                      <label htmlFor="fleet_size">
                        Fleet Size<span className="required">*</span>
                      </label>
                      <select
                        id="fleet_size"
                        {...register("fleet_size", {
                          required: "Fleet Size is required",
                        })}
                      >
                        <option value="" disabled>
                          Select Fleet Size
                        </option>
                        <option value="5-10 cars">5-10 cars</option>
                        <option value="Upto to 50 cars">Upto to 50 cars</option>
                        <option value="Upto to 100 cars">
                          Upto to 100 cars
                        </option>
                        <option value="Upto to 500 cars">
                          Upto to 500 cars
                        </option>
                        <option value="500+ cars">500+ cars</option>
                      </select>
                      {errors.fleet_size && (
                        <p className="errorText">{errors.fleet_size.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="contentCol">
                    <div
                      className={`inputCont full ${
                        errors?.contact_no ? "error" : ""
                      }`}
                    >
                      <label htmlFor="contact_no">
                        Contact No.<span className="required">*</span>
                      </label>
                      <input
                        className={`${errors?.contact_no ? "errorInput" : ""}`}
                        {...register("contact_no", {
                          required: "Contact No. is required.",
                        })}
                        type="number"
                        placeholder="Enter Contact No."
                        id="contact_no"
                      />

                      {errors?.contact_no ? (
                        <p className="errorText">{errors.contact_no.message}</p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="contentCol">
                    <div
                      className={`inputCont full ${
                        errors?.email_address ? "error" : ""
                      }`}
                    >
                      <label htmlFor="email_address">
                        Email Address<span className="required">*</span>
                      </label>
                      <input
                        className={`${
                          errors?.email_address ? "errorInput" : ""
                        }`}
                        {...register("email_address", {
                          required: "Email Address is required.",
                        })}
                        type="email"
                        placeholder="Enter Email Address"
                        id="email_address"
                      />

                      {errors?.email_address ? (
                        <p className="errorText">
                          {errors.email_address.message}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="contentCol">
                    <div className={`inputCont full`}>
                      <label htmlFor="country">
                        Country<span className="required">*</span>
                      </label>
                      <input
                        {...register("country")}
                        type="text"
                        id="country"
                        value={"United Arab Emirates"}
                        disabled
                      />
                    </div>
                  </div>
                  <div className="contentCol">
                    <div className={`inputCont ${errors?.city ? "error" : ""}`}>
                      <label htmlFor="city">
                        City<span className="required">*</span>
                      </label>
                      <select
                        id="city"
                        {...register("city", {
                          required: "City is required",
                        })}
                      >
                        <option value="" disabled>
                          Select City
                        </option>
                        <option value="Dubai">Dubai</option>
                        <option value="Abu Dhabi">Abu Dhabi</option>
                        <option value="Fujairah">Fujairah</option>
                        <option value="Ajman">Ajman</option>
                        <option value="Al Ain">Al Ain</option>
                        <option value="Sharjah">Sharjah</option>
                        <option value="Ras Al Khaimah">Ras Al Khaimah</option>
                        <option value="Umm Al Qwain">Umm Al Qwain</option>
                      </select>
                      {errors.city && (
                        <p className="errorText">{errors.city.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="contentCol">
                    <div
                      className={`inputCont img ${
                        errors?.company_logo ? "error" : ""
                      }`}
                    >
                      <label htmlFor="company_logo">
                        Company Logo<span className="required">*</span>
                      </label>
                      <div className="imgInput">
                        {companyLogoPreview ? (
                          <div className="imgBox">
                            <Image
                              src={companyLogoPreview}
                              width={300}
                              height={80}
                              alt="Company Logo"
                            />
                            <div className="actions">
                              <button onClick={() => setCompanyLogoPreview("")}>
                                <i className="fas fa-trash" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label htmlFor="company_logo">
                            "Click to Upload"
                            <input
                              {...register("company_logo", {
                                required: "Company Logo is Required",
                              })}
                              type="file"
                              name=""
                              id="company_logo"
                              onChange={(e) =>
                                handleImageChange(
                                  e,
                                  setCompanyLogoPreview,
                                  "company_logo"
                                )
                              }
                            />
                          </label>
                        )}
                      </div>
                      <p className="small">
                        Only "PNG, JPG, JPEG, and PDF" are accepted
                      </p>
                      {errors?.company_logo && (
                        <p className="errorText">
                          {errors?.company_logo?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="contentCol">
                    <div
                      className={`inputCont img ${
                        errors?.company_license ? "error" : ""
                      }`}
                    >
                      <label htmlFor="company_license">
                        Company License<span className="required">*</span>
                      </label>
                      <div className="imgInput">
                        {companyLicensePreview ? (
                          <div className="imgBox">
                            <Image
                              src={companyLicensePreview}
                              width={300}
                              height={80}
                              alt="Company License"
                            />
                            <div className="actions">
                              <button
                                onClick={() => setCompanyLicensePreview("")}
                              >
                                <i className="fas fa-trash" />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <label htmlFor="company_license">
                            "Click to Upload"
                            <input
                              {...register("company_license", {
                                required: "Company License is Required",
                              })}
                              type="file"
                              name=""
                              id="company_license"
                              onChange={(e) =>
                                handleImageChange(
                                  e,
                                  setCompanyLicensePreview,
                                  "company_license"
                                )
                              }
                            />
                          </label>
                        )}
                      </div>
                      <p className="small">
                        Only "PNG, JPG, JPEG, and PDF" are accepted
                      </p>
                      {errors?.company_license && (
                        <p className="errorText">
                          {errors?.company_license?.message}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="contentCol">
                    <div
                      className={`inputCont full ${
                        errors?.company_license_expiry ? "error" : ""
                      }`}
                    >
                      <label htmlFor="company_license_expiry">
                        Company License Expiry
                        <span className="required">*</span>
                      </label>
                      <input
                        className={`${
                          errors?.company_license_expiry ? "errorInput" : ""
                        }`}
                        {...register("company_license_expiry", {
                          required: "Company License Expiry is required.",
                        })}
                        type="date"
                        id="company_license_expiry"
                      />

                      {errors?.company_license_expiry ? (
                        <p className="errorText">
                          {errors.company_license_expiry.message}
                        </p>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div className="contentCol">
                    <div
                      className={`inputCont ${
                        errors?.service_type ? "error" : ""
                      }`}
                    >
                      <label htmlFor="service_type">
                        Service Type<span className="required">*</span>
                      </label>
                      <select
                        id="service_type"
                        {...register("service_type", {
                          required: "Service Type is required",
                        })}
                      >
                        <option value="" disabled>
                          Select Service Type
                        </option>
                        <option value="Rental Services">Rental Services</option>
                        <option value="Limousine Services">
                          Limousine Services
                        </option>
                      </select>
                      {errors.service_type && (
                        <p className="errorText">
                          {errors.service_type.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
                <div className="btnCont">
                  <button type="submit" className="themeBtn large">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="gallerySec">
        <div className="imagesGrid">
          {images.map((_, index) => (
            <figure key={index}>
              <Image
                src={`/images/cars/${index + 1}.webp`}
                alt={`gallery image ${index + 1}`}
                fill
              />
            </figure>
          ))}
        </div>
      </section>
    </>
  );
}

export default ListCarPageLayout;
