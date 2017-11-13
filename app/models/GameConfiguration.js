export type GameConfiguration = {
    // @TODO: Move some configs to their own model
    BulletDropTime: number,
    BulletSpawnRate: number,
    // @TODO: Implement bullet size in the bullet component
    BulletSize: number,
    // @TODO: Implement pad configuration in the pad component
    PadPadding: number,
    PadWidth: number,
    PadTop: number,
    Tick: number
}