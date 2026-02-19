import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

  .clsf-wrapper {
    font-family: 'DM Sans', sans-serif;
    background: #f5f7f2;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem;
  }

  .clsf-card {
    background: #ffffff;
    border-radius: 20px;
    padding: 2.5rem;
    width: 100%;
    max-width: 480px;
    box-shadow: 0 4px 24px rgba(45, 90, 39, 0.08);
    border: 1.5px solid #e8efe6;
    position: relative;
    overflow: hidden;
  }

  .clsf-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    background: linear-gradient(90deg, #3d7a35, #78c46e);
    border-radius: 20px 20px 0 0;
  }

  .clsf-header {
    margin-bottom: 2rem;
  }

  .clsf-tag {
    display: inline-block;
    background: #edf7eb;
    color: #3d7a35;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    margin-bottom: 0.75rem;
  }

  .clsf-title {
    font-family: 'Syne', sans-serif;
    font-size: 1.6rem;
    font-weight: 800;
    color: #1a2e18;
    margin: 0 0 0.25rem;
    line-height: 1.2;
  }

  .clsf-subtitle {
    font-size: 0.875rem;
    color: #7a917a;
    margin: 0;
    font-weight: 300;
  }

  .clsf-divider {
    font-family: 'Syne', sans-serif;
    font-size: 0.7rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #b5c8b3;
    margin: 1.75rem 0 1.25rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .clsf-divider::before,
  .clsf-divider::after {
    content: '';
    flex: 1;
    height: 1px;
    background: #e8efe6;
  }

  .clsf-field {
    margin-bottom: 1.25rem;
  }

  .clsf-label {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: #3d5c3a;
    margin-bottom: 0.5rem;
    letter-spacing: 0.02em;
  }

  .clsf-label .required { color: #e05555; font-size: 0.75rem; }

  .clsf-input,
  .clsf-select {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1.5px solid #dde8db;
    border-radius: 10px;
    font-size: 0.95rem;
    font-family: 'DM Sans', sans-serif;
    color: #1a2e18;
    background: #fafcf9;
    transition: all 0.2s ease;
    outline: none;
    box-sizing: border-box;
  }

  .clsf-select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%237a917a' d='M6 8L1 3h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
    cursor: pointer;
  }

  .clsf-input:focus,
  .clsf-select:focus {
    border-color: #3d7a35;
    background: #fff;
    box-shadow: 0 0 0 3px rgba(61, 122, 53, 0.1);
  }

  .clsf-input.error,
  .clsf-select.error {
    border-color: #e05555;
    background: #fff8f8;
    box-shadow: 0 0 0 3px rgba(224, 85, 85, 0.08);
  }

  .clsf-input::placeholder { color: #b5c8b3; font-weight: 300; }

  .clsf-input[type="number"]::-webkit-inner-spin-button,
  .clsf-input[type="number"]::-webkit-outer-spin-button { opacity: 1; }

  /* Points stepper */
  .clsf-points-wrap {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .clsf-stepper-btn {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    border: 1.5px solid #dde8db;
    background: #fafcf9;
    color: #3d5c3a;
    font-size: 1.2rem;
    font-weight: 700;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
    line-height: 1;
  }

  .clsf-stepper-btn:hover:not(:disabled) {
    background: #edf7eb;
    border-color: #3d7a35;
    color: #2d5c28;
  }

  .clsf-stepper-btn:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .clsf-input.points-input {
    text-align: center;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1.1rem;
    color: #2d5c28;
  }

  /* Teacher card preview */
  .clsf-teacher-preview {
    margin-top: 0.5rem;
    padding: 0.6rem 0.9rem;
    background: #edf7eb;
    border-radius: 8px;
    font-size: 0.8rem;
    color: #2d5c28;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    border: 1px solid #a8d9a2;
  }

  .clsf-hint {
    margin-top: 0.4rem;
    font-size: 0.75rem;
    color: #9aab99;
  }

  .clsf-char-count {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.3rem;
    font-size: 0.7rem;
    color: #b5c8b3;
  }

  .clsf-char-count.warn { color: #e09a35; }

  .clsf-error {
    margin-top: 0.4rem;
    font-size: 0.75rem;
    color: #e05555;
    display: flex;
    align-items: center;
    gap: 0.3rem;
  }

  .clsf-actions {
    display: flex;
    gap: 0.75rem;
    margin-top: 2rem;
  }

  .clsf-btn-submit {
    flex: 1;
    padding: 0.85rem 1.5rem;
    background: linear-gradient(135deg, #3d7a35, #2d5c28);
    color: white;
    border: none;
    border-radius: 10px;
    font-family: 'Syne', sans-serif;
    font-size: 0.9rem;
    font-weight: 700;
    cursor: pointer;
    transition: all 0.2s ease;
    letter-spacing: 0.03em;
  }

  .clsf-btn-submit:hover:not(:disabled) {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px rgba(45, 92, 40, 0.35);
  }

  .clsf-btn-submit:active:not(:disabled) { transform: translateY(0); }

  .clsf-btn-submit:disabled {
    background: #c8ddc5;
    cursor: not-allowed;
  }

  .clsf-btn-cancel {
    padding: 0.85rem 1.25rem;
    background: transparent;
    color: #7a917a;
    border: 1.5px solid #dde8db;
    border-radius: 10px;
    font-family: 'DM Sans', sans-serif;
    font-size: 0.9rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .clsf-btn-cancel:hover {
    background: #f5f7f2;
    border-color: #c8ddc5;
    color: #3d5c3a;
  }

  .clsf-success {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: #edf7eb;
    border: 1px solid #a8d9a2;
    border-radius: 10px;
    padding: 0.75rem 1rem;
    margin-bottom: 1.5rem;
    font-size: 0.85rem;
    color: #2d6828;
  }
`;

const validate = (values) => {
    const errors = {};

    // teacher: @OneToOne, nullable=false — requerido
    if (!values.teacher) {
        errors.teacher = "El profesor responsable es obligatorio";
    }

    // course: @NotBlank + @Size(min=2)
    if (!values.course || values.course.trim() === "") {
        errors.course = "El curso es obligatorio";
    } else if (values.course.trim().length < 2) {
        errors.course = "Mínimo 2 caracteres";
    }

    // points: int — debe ser >= 0
    if (values.points === "" || values.points === null || values.points === undefined) {
        errors.points = "Los puntos son obligatorios";
    } else if (isNaN(Number(values.points)) || Number(values.points) < 0) {
        errors.points = "Debe ser un número positivo";
    }

    return errors;
};

/**
 * ClassroomForm
 * Corresponde exactamente con la entidad Classroom.java
 *
 * Campos:
 *   teacher — @OneToOne → User (nullable=false)
 *   course  — String, @NotBlank, @Size(min=2)
 *   points  — int
 *
 * Excluidos:
 *   id    — auto-generado
 *   users — @OneToMany(mappedBy) relación inversa
 *
 * @param {function} onSubmit      — Recibe { teacher: { id }, course: string, points: number }
 * @param {object}   initialValues — Para modo edición
 * @param {function} onCancel      — Callback cancelar
 * @param {Array}    teachers      — Usuarios con rol TEACHER: [{ id, name, email }]
 */
export default function ClassroomForm({
    onSubmit,
    initialValues = { teacher: "", course: "", points: 0 },
    onCancel,
    teachers = [],
}) {
    const [values, setValues] = useState({
        teacher: initialValues.teacher?.id ?? "",
        course: initialValues.course ?? "",
        points: initialValues.points ?? 0,
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [submitted, setSubmitted] = useState(false);

    const isEditMode = Boolean(initialValues?.course);

    const selectedTeacher = teachers.find(
        (t) => String(t.id) === String(values.teacher)
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues((prev) => ({ ...prev, [name]: value }));
        if (touched[name]) {
            setErrors(validate({ ...values, [name]: value }));
        }
    };

    const handleBlur = (e) => {
        const { name } = e.target;
        setTouched((prev) => ({ ...prev, [name]: true }));
        setErrors(validate(values));
    };

    const handlePoints = (delta) => {
        const next = Math.max(0, Number(values.points) + delta);
        setValues((prev) => ({ ...prev, points: next }));
        setTouched((prev) => ({ ...prev, points: true }));
        setErrors(validate({ ...values, points: next }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setTouched({ teacher: true, course: true, points: true });
        const validationErrors = validate(values);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length > 0) return;

        const payload = {
            teacher: { id: Number(values.teacher) },
            course: values.course.trim(),
            points: Number(values.points),
        };

        setSubmitted(true);
        onSubmit?.(payload);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const handleCancel = () => {
        setValues({ teacher: "", course: "", points: 0 });
        setErrors({});
        setTouched({});
        onCancel?.();
    };

    const charCount = values.course?.length || 0;

    return (
        <>
            <style>{styles}</style>
            <div className="clsf-wrapper">
                <div className="clsf-card">
                    <div className="clsf-header">
                        <span className="clsf-tag">Gestión de aulas</span>
                        <h2 className="clsf-title">
                            {isEditMode ? "Editar aula" : "Nueva aula"}
                        </h2>
                        <p className="clsf-subtitle">
                            Configura el aula, asígnale un profesor responsable y sus puntos
                        </p>
                    </div>

                    {submitted && (
                        <div className="clsf-success">
                            <span>✓</span>
                            <span>Aula {isEditMode ? "actualizada" : "creada"} correctamente</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} noValidate>

                        {/* ── Datos del aula ── */}
                        <div className="clsf-divider">Datos del aula</div>

                        {/* course — @NotBlank, @Size(min=2) */}
                        <div className="clsf-field">
                            <label className="clsf-label" htmlFor="course">
                                Curso <span className="required">*</span>
                            </label>
                            <input
                                id="course"
                                name="course"
                                type="text"
                                className={`clsf-input ${errors.course && touched.course ? "error" : ""}`}
                                value={values.course}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Ej: 1ºA, 2ºB ESO, DAW2..."
                                autoComplete="off"
                            />
                            {errors.course && touched.course ? (
                                <p className="clsf-error">⚠ {errors.course}</p>
                            ) : (
                                <p className="clsf-hint">Mínimo 2 caracteres</p>
                            )}
                            <div className={`clsf-char-count ${charCount > 0 && charCount < 2 ? "warn" : ""}`}>
                                {charCount} caracteres
                            </div>
                        </div>

                        {/* points — int */}
                        <div className="clsf-field">
                            <label className="clsf-label" htmlFor="points">
                                Puntos <span className="required">*</span>
                            </label>
                            <div className="clsf-points-wrap">
                                <button
                                    type="button"
                                    className="clsf-stepper-btn"
                                    onClick={() => handlePoints(-10)}
                                    disabled={Number(values.points) <= 0}
                                    aria-label="Restar 10 puntos"
                                >
                                    −
                                </button>
                                <input
                                    id="points"
                                    name="points"
                                    type="number"
                                    min="0"
                                    className={`clsf-input points-input ${errors.points && touched.points ? "error" : ""}`}
                                    value={values.points}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                                <button
                                    type="button"
                                    className="clsf-stepper-btn"
                                    onClick={() => handlePoints(10)}
                                    aria-label="Sumar 10 puntos"
                                >
                                    +
                                </button>
                            </div>
                            {errors.points && touched.points ? (
                                <p className="clsf-error">⚠ {errors.points}</p>
                            ) : (
                                <p className="clsf-hint">Puntos acumulados por el aula en reciclaje</p>
                            )}
                        </div>

                        {/* ── Profesor responsable ── */}
                        <div className="clsf-divider">Profesor responsable</div>

                        {/* teacher — @OneToOne, nullable=false */}
                        <div className="clsf-field">
                            <label className="clsf-label" htmlFor="teacher">
                                Profesor <span className="required">*</span>
                            </label>
                            <select
                                id="teacher"
                                name="teacher"
                                className={`clsf-select ${errors.teacher && touched.teacher ? "error" : ""}`}
                                value={values.teacher}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            >
                                <option value="">— Selecciona un profesor —</option>
                                {teachers.map((t) => (
                                    <option key={t.id} value={t.id}>
                                        {t.name}
                                    </option>
                                ))}
                            </select>
                            {errors.teacher && touched.teacher ? (
                                <p className="clsf-error">⚠ {errors.teacher}</p>
                            ) : (
                                <p className="clsf-hint">Solo usuarios con rol TEACHER</p>
                            )}
                            {selectedTeacher && (
                                <div className="clsf-teacher-preview">
                                    <span>👨‍🏫</span>
                                    <span>{selectedTeacher.name} — {selectedTeacher.email}</span>
                                </div>
                            )}
                        </div>

                        <div className="clsf-actions">
                            <button
                                type="submit"
                                className="clsf-btn-submit"
                                disabled={Object.keys(validate(values)).length > 0}
                            >
                                {isEditMode ? "Guardar cambios" : "Crear aula"}
                            </button>
                            {onCancel && (
                                <button
                                    type="button"
                                    className="clsf-btn-cancel"
                                    onClick={handleCancel}
                                >
                                    Cancelar
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}