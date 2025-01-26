import { slug } from 'github-slugger'
import { Locale } from 'i18n-config'
import Link from 'next/link'

interface Props {
    text: string,
    lang: Locale
}

const Tag = ({ text, lang }: Props) => {
    return (
        <Link
            href={`/${lang}/tags/${slug(text)}`}
            className="text-sm font-medium uppercase text-primary hover:brightness-125 dark:hover:brightness-125"
        >
            {text.split(' ').join('-')}
        </Link>
    )
}

export default Tag
