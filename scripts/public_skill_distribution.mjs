// This boundary covers the bundled proprietary PDF skill, not the app license.
export function assertPublicSkillDistribution(trackedPaths, skillsLock) {
    const restricted = trackedPaths.filter((file) => file.replaceAll('\\', '/').startsWith('.agents/skills/pdf/'));
    if (restricted.length || Object.hasOwn(skillsLock.skills ?? {}, 'pdf')) {
        throw new Error('The separately licensed PDF skill must remain outside public source and the shared skill install lock.');
    }
}
