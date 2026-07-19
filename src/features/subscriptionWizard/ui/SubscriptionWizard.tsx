import { useActionState } from "react";
import styles from "./SubscriptionWizard.module.css";

type FormState = {
    step: 1 | 2;
    email: string;
    error: string;
    success: string;
};

const initialState: FormState = {
    step: 1,
    email: "",
    error: "",
    success: "",
};

const wait = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

const subscriptionAction = async (
    previousState: FormState,
    formData: FormData,
): Promise<FormState> => {
    await wait(700);

    const action = formData.get("action");

    if (action === "back") {
        return {
            ...previousState,
            step: 1,
            error: "",
            success: "",
        };
    }

    if (previousState.step === 1) {
        const email = String(formData.get("email") ?? "").trim();

        if (!email) {
            return {
                ...previousState,
                error: "Введите email",
            };
        }

        if (!email.includes("@")) {
            return {
                ...previousState,
                error: "Введите корректный email",
            };
        }

        return {
            step: 2,
            email,
            error: "",
            success: "",
        };
    }

    return {
        ...previousState,
        error: "",
        success: `Подписка для ${previousState.email} успешно оформлена`,
    };
};

export const SubscriptionWizard = () => {
    const [state, formAction, isPending] = useActionState(
        subscriptionAction,
        initialState,
    );

    return (
        <form action={formAction} className={styles.subscriptionWrapper} noValidate>
            <h2>* Подписка на новости</h2>

            <p>Шаг {state.step} из 2</p>

            {state.step === 1 && (
                <div className={styles.fieldGroup}>
                    <label className={styles.label} htmlFor="subscription-email">
                        Email
                    </label>

                    <input
                        id="subscription-email"
                        name="email"
                        type="email"
                        defaultValue={state.email}
                        className={`${styles.input} ${state.error ? styles.inputError : ""
                            }`}
                        placeholder="user@example.com"
                        disabled={isPending}
                    />

                    {state.error && (
                        <div className={styles.errorText}>{state.error}</div>
                    )}

                    <button
                        type="submit"
                        className={styles.submitBtn}
                        disabled={isPending}
                    >
                        {isPending ? "Проверка..." : "Продолжить"}
                    </button>
                </div>
            )}

            {state.step === 2 && !state.success && (
                <div className={styles.fieldGroup}>
                    <p>
                        Подтвердить подписку для <strong>{state.email}</strong>?
                    </p>

                    {state.error && (
                        <div className={styles.errorText}>{state.error}</div>
                    )}

                    <button
                        type="submit"
                        name="action"
                        value="confirm"
                        className={styles.submitBtn}
                        disabled={isPending}
                    >
                        {isPending ? "Отправка..." : "Подтвердить"}
                    </button>

                    <button
                        type="submit"
                        name="action"
                        value="back"
                        className={styles.removeBtn}
                        disabled={isPending}
                    >
                        Назад
                    </button>
                </div>
            )}

            {state.success && (
                <div>
                    <p>{state.success}</p>

                    <button
                        type="submit"
                        name="action"
                        value="back"
                        className={styles.addBtn}
                    >
                        Изменить email
                    </button>
                </div>
            )}
        </form>
    );
};