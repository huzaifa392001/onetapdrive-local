import Image from "next/image";

import { Fragment, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Controller } from "react-hook-form";
import './dropzoneFiled.scss'

const DropzoneField = (props) => {
    return (
        <Controller
            control={props.control}
            name={props.name}
            render={({ field: { onChange } }) => {
                return (
                    <Dropzone
                        setValue={props.setValue}
                        multiple={props.multiple}
                        req={props.req}
                        vertical={props.vertical}
                        label={props.label}
                        onChange={(e) => {
                            onChange(props.multiple ? e : e[0]);
                        }}
                        accept={props?.accept}
                        value={props.value}
                        name={props.name}
                        setdropzoneData={props.setdropzoneData}
                        bottomLabel={props.bottomLabel}
                        maxLimit={props.maxLimit}
                        maxLimitMessage={props.maxLimitMessage}
                        uploadLabel={props.uploadLabel}
                        isFieldDisabled={props.isFieldDisabled}
                        removeItem={props.fileRemove}
                        defaultValue={props?.defaultValue}
                    />
                );
            }}
        />
    );
};

const Dropzone = ({
    multiple,
    onChange,
    accept,
    setdropzoneData,
    setValue,
    bottomLabel,
    maxLimit,
    maxLimitMessage,
    uploadLabel,
    isFieldDisabled,
    removeItem,
    defaultValue,
}) => {
    const [files, setFiles] = useState([]);
    const [errorMsg, setErrorMsg] = useState(null);

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        accept: accept,
        maxSize: maxLimit, // 2MB size limit
        multiple,
        disabled: isFieldDisabled,
        onDrop: (acceptedFiles) => {
            console.log(acceptedFiles, "acceptedFiles");
            onChange(acceptedFiles);
            setFiles(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        },
        onDropRejected: () => {
            setErrorMsg(maxLimitMessage); // Set error message
        },
    });

    useEffect(() => {
        if (removeItem) {
            setFiles([]);
            // setdropzoneData([]);
        }
    }, [removeItem]);

    useEffect(() => {
        if (setValue) {
            setFiles(
                [setValue].map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            );
        } else if (defaultValue) {
            setFiles([{ preview: defaultValue }]); // Directly use the image URL
        }
    }, [setValue, defaultValue]);


    // Convert files to Base64
    // const convertFilesToBase64 = (files) => {
    //   const promises = files.map((file: File) => {
    //     return new Promise((resolve, reject) => {
    //       const reader = new FileReader();
    //       reader.readAsDataURL(file);
    //       reader.onload = () => {
    //         resolve(reader.result);
    //       };
    //       reader.onerror = (error) => reject(error);
    //     });
    //   });

    //   Promise.all(promises)
    //     .then((base64Results) => {
    //       onChange(base64Results); // Send base64 files to parent
    //     })
    //     .catch((error) => console.error("Error converting to Base64:", error));
    // };

    // Remove File
    const remove = (file) => {
        acceptedFiles?.splice(file, 1);
        onChange(acceptedFiles);
        setFiles([]);
        setdropzoneData?.([]);
    };

    // console.log(files, "files");

    return (
        <>
            <div className={`inputFileContainer `}>
                {/* <h4 className="fw-600 dropzoneLabel">
          {label}
          {req && <span className={style.required}> *</span>}
        </h4> */}
                <div>
                    {files?.length == 0 ? (
                        <div {...getRootProps()}>
                            <input {...getInputProps({ onChange })} />
                            <div
                                className={`inputFileWrapper ${isFieldDisabled ? 'isFieldDisabled' : ""
                                    } dropzoneInputFileWrapper`}
                            >
                                <div className={'iconWrapper'}></div>
                                <button
                                    type="button"
                                    className={'themeBtn'}
                                >
                                    {uploadLabel
                                        ? uploadLabel
                                        : "Drop your Receipt here"}
                                </button>
                            </div>
                            {bottomLabel && (
                                <h6 className={'bottomLabel'}>
                                    {bottomLabel}
                                </h6>
                            )}
                        </div>
                    ) : (
                        <ul
                            className={`uploadedFiles ${isFieldDisabled ? "isFieldDisabled" : ""
                                }`}
                        >
                            {files.map((file, i) => (
                                <Fragment key={i}>
                                    <li className={'fileItem'}>
                                        <div className={'previewImg'}>
                                            <Image
                                                src={file?.preview}
                                                fill
                                                alt="img"
                                                onLoad={() => {
                                                    URL.revokeObjectURL(
                                                        file.preview
                                                    );
                                                }}
                                            />
                                        </div>

                                        <button
                                            type="button"
                                            className={'removeItem'}
                                            onClick={() => remove(i)}
                                        >
                                            <i class="fas fa-trash" />
                                        </button>
                                    </li>
                                </Fragment>
                            ))}
                        </ul>
                    )}
                    {errorMsg && (
                        <p style={{ color: "red", fontSize: "1em" }}>
                            {errorMsg}
                        </p>
                    )}
                </div>
            </div>
        </>
    );
};

export default DropzoneField;
