import styles from './Header.module.css'

export function Header () {
    return (
        <header className={styles.header}>
            <img src="/logotipoGitHub.svg" alt="Logo GitHub" />
            <h1>Gerenciador de Tarefas</h1>    
        </header>
    )
}